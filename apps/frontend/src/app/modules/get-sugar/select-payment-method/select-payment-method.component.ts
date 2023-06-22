import { BehaviorSubject, takeUntil } from "rxjs";
import { ApiService } from "./../../../services/api.service";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TextsEnum } from "../../../core/constants/texts.enum";
import { DropDownOption } from "../../../core/types/drop-down-option.interface";
import { ModalsService } from "../../../services/modals.service";
import { Watcher } from "../../../shared/classes/watcher";
import { GetWalletResponseBody, WalletEnum, WalletType, WindowType } from "@cake/lib-api-interface";
import { EthereumEventService, Web3Service, WINDOW } from "@cake/web3";

import { Location } from "@angular/common";
import { DataService } from "@cake/utils";
import { CustomToasterService } from "../../../services/toaster.service";
import { ToasterPosition } from "../../../core/types/toaster-position";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../services/auth.service";
import { ThemeService } from "../../../services/theme.service";
@Component({
	selector: "cake-select-payment-method",
	templateUrl: "./select-payment-method.component.html",
	styleUrls: ["./select-payment-method.component.scss", "./../get-sugar.component.scss"],
})
export class SelectPaymentMethodComponent extends Watcher implements OnInit, OnDestroy {
	selected: BehaviorSubject<number> = new BehaviorSubject(-1);

	public readonly userWallet = new BehaviorSubject<Array<WalletType>>([{ address: "", type: WalletEnum.MetaMask, id: "", name: "" }]);
	public allowance = false;
	public isCrypro = false;
	public isSelectedAddress = false;
	selectedAddMethod!: DropDownOption;

	loading = false;

	selectMethodOptions: Array<DropDownOption> = [
		{
			value: "wallet",
			label: "Add wallet",
		},
	];

	isSelect = false;

	isAdd = false;

	showAll = false;

	public get isLight(): boolean {
		return this.themesService.active.name === "light-theme";
	}

	constructor(
		private activatedRouter: ActivatedRoute,
		private modalsService: ModalsService,
		private apiService: ApiService,
		private readonly web3Service: Web3Service,
		private readonly dataService: DataService,
		private authService: AuthService,
		private router: Router,
		private location: Location,
		private ethereumEventService: EthereumEventService,
		private toster: CustomToasterService,
		private themesService: ThemeService,
		@Inject(WINDOW)
		public window: WindowType
	) {
		super();
		const method = this.activatedRouter.snapshot?.params["method"];
		if (method) {
			this.selectedAddMethod = this.selectMethodOptions.find((el) => el.value === method) as DropDownOption;
		}

		const amount = JSON.parse(this.activatedRouter.snapshot?.params["amount"] || "0");
		if (amount) {
			this.dataService.selectedSugar.next(amount);
		}

		this.dataService.selectedSugar.pipe(takeUntil(this.unsubscribe)).subscribe((sugar) => {
			if (!sugar) {
				location.back();
			}
		});
	}

	ngOnInit() {
		this.isSelect = this.activatedRouter.snapshot?.data["isSelect"];
		this.isAdd = this.activatedRouter.snapshot?.data["isAdd"];

		this.apiService.getWallets().subscribe((wallets: GetWalletResponseBody) => {
			this.userWallet.next(wallets.data.wallets);
			const id = this.activatedRouter.snapshot?.params["id"];
			const wallet = wallets.data.wallets.find((wallet) => wallet.id === id);
			if (wallet) {
				this.paymentCheck(wallet, wallets.data.wallets.indexOf(wallet));
			}
		});
	}

	methodChosen(value: DropDownOption) {
		this.selectedAddMethod = value;
		if (this.selectedAddMethod.value === "wallet" && environment.plugin) {
			window.open(
				`${environment.frontendUrl}/auth/redirect?token=${this.authService.getToken()}&path=/get-sugar/add-payment-method/${
					this.selectedAddMethod.value
				}/${this.dataService.selectedSugar.getValue()}`
			);
		}
	}

	public setSelected(index: number) {
		this.selected.next(index);
	}
	public async paymentCheck(wallet: WalletType, index: number) {
		this.setSelected(index);
		if (wallet.type === "METAMASK") {
			console.log(environment.plugin);

			if (environment.plugin) {
				window.open(
					`${environment.frontendUrl}/auth/redirect?token=${this.authService.getToken()}&path=/get-sugar/select-payment-method/${
						wallet.id
					}/${this.dataService.selectedSugar.getValue()}`
				);
			}
			if (this.window.ethereum) {
				this.loading = true;
				await this.checkAllowanceMetamask();
				this.isSelectedAddress = this.dataService.walletAddres.value === wallet.address;
				this.loading = false;
			}
		} else {
			//other payment methods if needed
		}
	}

	public async checkAllowanceMetamask() {
		this.loading = true;
		const allowance = await this.web3Service.checkAllowance(this.userWallet.getValue()[this.selected.getValue()].address);
		this.loading = false;
		console.log("allowance", allowance);
		this.allowance = allowance;
		this.isCrypro = true;
	}

	public async approve() {
		this.loading = true;
		await this.web3Service.approve();
		await this.checkAllowanceMetamask();
		this.loading = false;
	}

	public async buySugar() {
		const amount = this.dataService.selectedSugar.getValue();
		// if (this.web3Service.getUserBalance() < Number(amount)) {
		// 	this.toster.showErrorToaster(ToasterPosition.bottomCenter, TextsEnum.NotEnoughBalance);
		// 	return;
		// }
		if (amount) {
			this.loading = true;
			await this.web3Service.deposit(amount);
			this.loading = false;
		}
	}

	continue() {
		if (this.isAdd && this.selected.getValue() > -1) {
			this.modalsService.openConfirmToAdd(TextsEnum.ConfirmToAdd);
		}
	}

	navigateToAddPaymentMethod() {
		this.selected.next(-1);
		this.router.navigateByUrl(`/get-sugar/add-payment-method/false/${this.dataService.selectedSugar.getValue()}`);
	}

	override ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
