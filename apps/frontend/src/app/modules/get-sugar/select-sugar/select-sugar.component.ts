import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "@cake/utils";
import { AuthService } from "../../../services/auth.service";

@Component({
	selector: "cake-select-sugar",
	templateUrl: "./select-sugar.component.html",
	styleUrls: ["./select-sugar.component.scss", "./../get-sugar.component.scss"],
})
export class SelectSugarComponent {
	selected!: number;

	constructor(public authService: AuthService, private readonly dataService: DataService, private router: Router) {}

	selectSugar(value: number, select: number) {
		this.dataService.setSelectedSugar(value);
		this.selected = select;
	}

	navigateToSelectPaymentMethod() {
		this.router.navigateByUrl(`/get-sugar/select-payment-method/false/${this.dataService.selectedSugar.getValue()}`)
	}

}
