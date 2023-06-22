import { Component, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RewardEnum, RewardItem } from '@cake/lib-api-interface';
import { catchError, of } from 'rxjs';
import { ToasterPosition } from '../../../core/types/toaster-position';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { ModalsService } from '../../../services/modals.service';
import { CustomToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'cake-get-reward',
  templateUrl: './get-reward.component.html',
  styleUrls: ['./get-reward.component.scss'],
})
export class GetRewardComponent {

  rewardEnum = RewardEnum;

  disabled = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RewardItem,
    public dialogRef: MatDialogRef<GetRewardComponent>,
    private modalService: ModalsService,
    public authService: AuthService,
    private apiService: ApiService,
    private customToasterService: CustomToasterService,
    private router: Router,
    private zone: NgZone
    ) {}

  returnToReward(id: string) {
    this.modalService.openRewardPopup(id);
    this.dialogRef.close();
  }

  byReward(id: string) {
    this.disabled = true;
      this.apiService.byReward(id).pipe(catchError(error => {
        this.customToasterService.showErrorToaster(ToasterPosition.bottomCenter, error.error.error)
        return of(error)
      })).subscribe(() => {
        this.zone.run(() => {
          this.router.navigateByUrl('/rewards');
        })
        this.dialogRef.close()
      });
  }
}
