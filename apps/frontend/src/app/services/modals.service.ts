import { Watcher } from "./../shared/classes/watcher";
import { ApiService } from "./api.service";
import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { KolItem, RewardItem, WalletEnum } from "@cake/lib-api-interface";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { ConfirmSettingsComponent } from "../modules/profile/components/confirm-settings/confirm-settings.component";
import { ConfirmPopupComponent } from "../shared/components/confirm-popup/confirm-popup.component";
import { GetRewardComponent } from "../shared/components/get-reward/get-reward.component";
import { KolComponent } from "../shared/components/kol/kol.component";
import { RewardComponent } from "../shared/components/reward/reward.component";
import { Web3Service } from "@cake/web3";
import { Router } from "@angular/router";
import { CustomToasterService } from "./toaster.service";
import { ToasterPosition } from "../core/types/toaster-position";
import { DeleteWalletComponent } from "../shared/components/delete-wallet/delete-wallet.component";
import { AddWalletPopupComponent } from "../shared/components/add-wallet-popup/add-wallet-popup.component";
import { DataService } from "@cake/utils";

@Injectable({
	providedIn: "root",
})
export class ModalsService extends Watcher implements OnDestroy {

	private hasUsernameExistError = new BehaviorSubject<boolean>(false);

	public handleDeleteWallet = new Subject<boolean>();

	public handleAddWallet = new Subject<boolean>();

	public handleClaimed = new Subject<boolean>();

	constructor(
		private dialog: MatDialog,
		@Inject(DOCUMENT) private document: Document,
		private apiService: ApiService,
		private web3Service: Web3Service,
		private readonly router: Router,
		private readonly toastrService: CustomToasterService,
		private dataService: DataService
	) {
		super();
	}

	openRewardPopup(id: string) {
		this.dialog.open(RewardComponent, {
			data: {
				id,
			},
			autoFocus: false,
			backdropClass: "backdropBackground",
		});

		// dialogRef.afterClosed().subscribe(result => {
		//   console.log('The dialog was closed');
		//   this.animal = result;
		// });
	}

	openClaimCakeboxPopup(id: string) {
		const dialogRef = this.dialog.open(RewardComponent, {
			data: {
				id,
				isClaimed: true,
			},
			autoFocus: false,
			backdropClass: "backdropBackground",
		});
		document.documentElement.classList.remove("cdk-global-scrollblock");
		dialogRef.afterClosed().subscribe(() => {
			this.handleClaimed.next(true);
		});
	}

	getRewardPopup(reward: RewardItem) {
		this.dialog.open(GetRewardComponent, {
			data: reward,
			autoFocus: false,
			// mandatory if we need blur background
			backdropClass: "backdropBackground",
		});
		document.documentElement.classList.remove("cdk-global-scrollblock");
		// dialogRef.afterClosed().subscribe(result => {
		//   console.log('The dialog was closed');
		//   this.animal = result;
		// });
	}

	openKolPopup(data: KolItem) {
		this.dialog.open(KolComponent, {
			data: data,
			autoFocus: false,
			backdropClass: "backdropBackground",
		});
		document.documentElement.classList.remove("cdk-global-scrollblock");
		// dialogRef.afterClosed().subscribe(result => {
		//   console.log('The dialog was closed');
		//   this.animal = result;
		// });
	}

	openDeleteWallet(address: string, id: string) {
		const dialogRef = this.dialog.open(DeleteWalletComponent, {
			data: {
				address,
			},
			autoFocus: false,
			backdropClass: "backdropBackground",
			panelClass: "visible-mat-dialog-container",
		});

		dialogRef.afterClosed().subscribe((confirm) => {
			if (confirm) {
				this.apiService
					.deleteWallet(id)
					.pipe(takeUntil(this.unsubscribe))
					.subscribe(() => {
						this.handleDeleteWallet.next(true);
					});
			}
		});
	}

	openConfirmToAdd(text: string) {
		const dialogRef = this.dialog.open(ConfirmPopupComponent, {
			data: {
				text,
			},
			autoFocus: false,
			backdropClass: "backdropBackground",
			panelClass: "visible-mat-dialog-container",
		});

		dialogRef.afterClosed().subscribe(async (confirm) => {
			if (confirm) {
				//TODO add name
				this.apiService.addWallet(await this.web3Service.connectToMetaMask(), WalletEnum.MetaMask, WalletEnum.MetaMask).subscribe(
					(el) => console.log(el),
					(error) => {
						console.log(error);
						this.toastrService.showErrorToaster(ToasterPosition.topCenter, "Address already exists");
					},
					() => {
						this.router.navigate([`/get-sugar/select-payment-method/false/${this.dataService.selectedSugar.getValue()}`]);
					}
				);
			}
		});
	}

	openSettingsConfirmationPopup(userName: string, id: string) {
		const dialogRef = this.dialog.open(ConfirmSettingsComponent, {
			data: {
				id,
				userName,
			},
			backdropClass: "backdropBackground",
		});
		document.documentElement.classList.remove("cdk-global-scrollblock");

		dialogRef.afterClosed().subscribe((result) => {
			if (result?.P2002) {
				this.hasUsernameExistError.next(true);
			} else {
				this.hasUsernameExistError.next(false);
			}
		});
	}

	openAddingWalletPopup() {
		this.dialog.open(AddWalletPopupComponent, {
			backdropClass: "backdropBackground",
		});
		document.documentElement.classList.remove("cdk-global-scrollblock");
	}

	get hasUsernameExistError$() {
		return this.hasUsernameExistError.asObservable();
	}

	override ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
