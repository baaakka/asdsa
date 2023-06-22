import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import {
	GetWalletResponseBody,
	KolItem,
	LoginRequestBody,
	LoginResponseBody,
	RegisterRequestBody,
	RegisterResponseBody,
	RewardItem,
	UserProfileResponse,
	WalletEnum,
} from "@cake/lib-api-interface";
import { AuthService } from "./auth.service";
import { Query } from "../core/types/query.interface";
import { Pagination } from "../core/types/pagination.interface";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	//!!TODO: add type!!
	constructor(private readonly httpClient: HttpClient, private readonly authService: AuthService) {}

	private readonly apiUrl: string = environment.apiUrl;

	getHeaders() {
		const header = {
			headers: new HttpHeaders().set("Authorization", `Bearer ${this.authService.getToken()}`),
		};
		return header;
	}

	getQuery(query: Query): string {
		return Object.entries(query)
			.filter((element) => element[1] || element[1] === false)
			.map((el) => `${el[0]}=${el[1]}`)
			.join("&");
	}

	public signUp(req: RegisterRequestBody): Observable<RegisterResponseBody> {
		return this.httpClient.post<RegisterResponseBody>(`${this.apiUrl}/api/register`, req);
	}

	public signIn(req: LoginRequestBody): Observable<LoginResponseBody> {
		return this.httpClient.post<LoginResponseBody>(`${this.apiUrl}/api/login`, req);
	}

	public getUsers(req: Query): Observable<Pagination<Array<KolItem>>> {
		return this.httpClient.get<Pagination<Array<KolItem>>>(`${this.apiUrl}/api/users?${this.getQuery(req)}`, this.getHeaders());
	}

	public getRewards(req: Query): Observable<Pagination<Array<RewardItem>>> {
		return this.httpClient.get<Pagination<Array<RewardItem>>>(`${this.apiUrl}/api/reward?${this.getQuery(req)}`, this.getHeaders());
	}

	public getRewardById(id: string): Observable<{ data: RewardItem }> {
		return this.httpClient.get<{ data: RewardItem }>(`${this.apiUrl}/api/reward/${id}`, this.getHeaders());
	}

	public getUserById(id: string, query: Query): Observable<Pagination<{ rewards: Array<RewardItem> }>> {
		return this.httpClient.get<Pagination<{ rewards: Array<RewardItem> }>>(
			`${this.apiUrl}/api/users/kol/${id}?${this.getQuery(query)}`,
			this.getHeaders()
		);
	}

	public follow(userId: string): Observable<unknown> {
		return this.httpClient.put<unknown>(`${this.apiUrl}/api/followers`, { userId }, this.getHeaders());
	}

	public unfollow(userId: string): Observable<unknown> {
		return this.httpClient.delete<unknown>(`${this.apiUrl}/api/followers`, { body: { userId }, ...this.getHeaders() });
	}

	public updateUser(userData: any, userId: string): Observable<unknown> {
		return this.httpClient.put<unknown>(
			`${this.apiUrl}/api/users/${userId}`,
			{
				...userData,
			},
			this.getHeaders()
		);
	}

	public getUserProfileInfo(): Observable<UserProfileResponse> {
		return this.httpClient.get<UserProfileResponse>(`${this.apiUrl}/api/user/profile`, this.getHeaders()).pipe(
			tap((data: UserProfileResponse) => {
				this.authService.userProfile.next(data.data);
			})
		);
	}

	public byReward(id: string): Observable<unknown> {
		return this.httpClient.put<unknown>(`${this.apiUrl}/api/reward/buy/${id}`, {}, this.getHeaders());
	}

	public claimCakebox(id: string): Observable<unknown> {
		return this.httpClient.put<unknown>(`${this.apiUrl}/api/reward/claim/${id}`, {}, this.getHeaders());
	}

	public toConfectionary(id: string): Observable<unknown> {
		return this.httpClient.put<unknown>(`${this.apiUrl}/api/reward/toConfectionary/${id}`, { isConfectionary: true }, this.getHeaders());
	}

	public RemoveFromConfectionary(id: string): Observable<unknown> {
		return this.httpClient.put<unknown>(`${this.apiUrl}/api/reward/toConfectionary/${id}`, { isConfectionary: false }, this.getHeaders());
	}

	public addWallet(address: string, type: WalletEnum, name: string): Observable<unknown> {
		return this.httpClient.post<unknown>(`${this.apiUrl}/api/wallet`, { address, type, name }, this.getHeaders());
	}

	public editWallet(wallet: GetWalletResponseBody['data']['wallets'][0]): Observable<unknown> {
		return this.httpClient.put<unknown>(`${this.apiUrl}/api/wallet`, wallet, this.getHeaders());
	}

	public getWallets(): Observable<GetWalletResponseBody> {
		return this.httpClient.get<GetWalletResponseBody>(`${this.apiUrl}/api/wallet`, this.getHeaders());
	}

	public deleteWallet(id: string): Observable<unknown> {
		return this.httpClient.delete<unknown>(`${this.apiUrl}/api/wallet/${id}`, this.getHeaders());
	}
}
