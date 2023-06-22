import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GetSugarRoutingModule } from "./get-sugar-routing.module";
import { GetSugarComponent } from "./get-sugar.component";
import { SelectSugarComponent } from "./select-sugar/select-sugar.component";
import { SelectPaymentMethodComponent } from "./select-payment-method/select-payment-method.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	declarations: [GetSugarComponent, SelectSugarComponent, SelectPaymentMethodComponent, ConfirmationComponent],
	imports: [CommonModule, GetSugarRoutingModule, SharedModule],
})
export class GetSugarModule {}
