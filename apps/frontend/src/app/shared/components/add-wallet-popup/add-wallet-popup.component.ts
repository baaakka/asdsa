import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { GetWalletResponseBody, WalletEnum, WalletType } from "@cake/lib-api-interface";
import { Web3Service } from "@cake/web3";
import { BehaviorSubject } from "rxjs";
import { LightTheme } from "../../../core/types/Themes";
import { ToasterPosition } from "../../../core/types/toaster-position";
import { ApiService } from "../../../services/api.service";
import { ModalsService } from "../../../services/modals.service";
import { ThemeService } from "../../../services/theme.service";
import { CustomToasterService } from "../../../services/toaster.service";

@Component({
	selector: "cake-add-wallet-popup",
	templateUrl: "./add-wallet-popup.component.html",
	styleUrls: ["./add-wallet-popup.component.scss"],
})
export class AddWalletPopupComponent implements OnInit {
	selected: BehaviorSubject<number> = new BehaviorSubject(0);

	public readonly userWallet = new BehaviorSubject<Array<WalletType>>([{ address: "", type: WalletEnum.MetaMask, id: '', name: '' }]);

	loading = false;

	public allowance = false;

	public isCrypto = false;
	language = 'en'

	constructor(
		public dialogRef: MatDialogRef<AddWalletPopupComponent>,
		private themeService: ThemeService,
		private readonly web3Service: Web3Service,
		private apiService: ApiService,
		private toastrService: CustomToasterService,
		private modalService: ModalsService,
	) {
		this.apiService.getWallets().subscribe((wallets: GetWalletResponseBody) => {
			this.userWallet.next(wallets.data.wallets);
		});
	}

	ngOnInit(): void {
		this.getLanguage()
	}


	getLanguage() {
		this.language = localStorage.getItem("lang") || "en";
	}


	public setSelected(index: number) {
		this.selected.next(index);
	}

	get closeCircle() {
		return this.themeService.active === LightTheme ? "close-light" : "close-dark";
	}

	public async checkAllowanceMetamask() {
		this.loading = true;
		const allowance = await this.web3Service.checkAllowance(this.userWallet.getValue()[this.selected.getValue()].address);
		this.loading = false;
		console.log("allowance", allowance);
		this.allowance = true;
		this.isCrypto = true;
	}

	public async approve() {
		this.loading = true;
		await this.web3Service.approve();
		await this.checkAllowanceMetamask();
		this.loading = false;
	}

	async continue() {
		if (this.selected.value === 1) {
			this.apiService.addWallet(await this.web3Service.connectToMetaMask(), WalletEnum.MetaMask, WalletEnum.MetaMask).subscribe(
				(el) => console.log(el),
				(error) => {
					console.log(error);
					this.toastrService.showErrorToaster(ToasterPosition.bottomCenter, "Address already exists");
				},
				async () => {
					await this.web3Service.approve();
					this.modalService.handleAddWallet.next(true);
					this.dialogRef.close();
				}
			);
		}
	}
}
