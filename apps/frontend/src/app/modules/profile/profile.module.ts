import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfirmSettingsComponent } from './components/confirm-settings/confirm-settings.component';


@NgModule({
  declarations: [ProfileComponent, ConfirmSettingsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
  ]
})
export class ProfileModule { }
