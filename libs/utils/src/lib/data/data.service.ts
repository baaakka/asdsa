import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class DataService {
	public selectedSugar = new BehaviorSubject<number | null>(null);
	public walletAddres = new BehaviorSubject<string | null>(null);
	public setSelectedSugar(sugarAmount: number) {
		try {
			Number(sugarAmount);
			this.selectedSugar.next(sugarAmount);
		} catch (error) {
			throw new Error("Error in setSelectedSugar");
		}
	}
	public setWalletAddress(walletAddres: string) {
		try {
			this.walletAddres.next(walletAddres);
		} catch (error) {
			throw new Error("Cannot set wallet address");
		}
	}
}
