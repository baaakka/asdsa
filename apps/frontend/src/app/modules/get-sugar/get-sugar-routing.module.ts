import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { GetSugarComponent } from './get-sugar.component';
import { SelectPaymentMethodComponent } from './select-payment-method/select-payment-method.component';
import { SelectSugarComponent } from './select-sugar/select-sugar.component';

const routes: Routes = [
  {
    path: '',
    component: GetSugarComponent,
    children: [
      {
        path: '',
        component: SelectSugarComponent,
        data: {
          step: 1,
        },
      },
      {
        path: 'select-payment-method/:id/:amount',
        component: SelectPaymentMethodComponent,
        data: {
          step: 2,
          isSelect: true,
        },
      },
      {
        path: 'add-payment-method/:method/:amount',
        component: SelectPaymentMethodComponent,
        data: {
          step: 2,
          isAdd: true,
        },
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        data: {
          step: 3,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetSugarRoutingModule {}
