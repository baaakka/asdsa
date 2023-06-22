import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfectioneryRoutingModule } from './confectionery-routing.module';
import { ConfectioneryComponent } from './confectionery.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ConfectioneryComponent],
  imports: [CommonModule, ConfectioneryRoutingModule, SharedModule],
})
export class ConfectioneryModule {}
