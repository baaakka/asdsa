import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainListRoutingModule } from './main-list-routing.module';
import { MainListComponent } from './main-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [MainListComponent],
  imports: [CommonModule, MainListRoutingModule, SharedModule],
})
export class MainListModule {}
