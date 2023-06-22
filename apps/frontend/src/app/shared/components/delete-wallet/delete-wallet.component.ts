import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { LightTheme } from "../../../core/types/Themes";
import { ThemeService } from "../../../services/theme.service";

@Component({
	selector: "cake-delete-wallet",
	templateUrl: "./delete-wallet.component.html",
	styleUrls: ["./delete-wallet.component.scss"],
})
export class DeleteWalletComponent implements OnInit {
	language = 'en'
	constructor(
		public dialogRef: MatDialogRef<DeleteWalletComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { address: string },
		private themeService: ThemeService
	) {}

	ngOnInit() {
		this.getLanguage()
	}


	getLanguage() {
		this.language = localStorage.getItem("lang") || "en";
	}

	get closeCircle() {
		return this.themeService.active === LightTheme ? "close-light" : "close-dark";
	}
}
