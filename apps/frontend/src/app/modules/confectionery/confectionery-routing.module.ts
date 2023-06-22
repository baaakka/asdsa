import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfectioneryComponent } from './confectionery.component';

const routes: Routes = [{
  path: '',
  component: ConfectioneryComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfectioneryRoutingModule { }
