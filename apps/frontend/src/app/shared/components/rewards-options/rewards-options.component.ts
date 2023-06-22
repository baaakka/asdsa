import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RewardItem } from '@cake/lib-api-interface';
import { ApiService } from '../../../services/api.service';
import { ModalsService } from '../../../services/modals.service';
import { RewardService } from '../../../services/reward.service';
import { Watcher } from '../../classes/watcher';

@Component({
  templateUrl: './rewards-options.component.html',
  styleUrls: ['./rewards-options.component.scss'],
  selector: 'cake-rewards-options',
})
export class RewardsOptionsComponent extends Watcher implements OnDestroy {
  reward!: RewardItem;

  right!: number;

  top!: number;

  constructor(
    public dialog: MatDialog,
    private modalService: ModalsService,
    private apiService: ApiService,
    private rewardService: RewardService
  ) {
    super();
  }

  onMenuOptionClick(option: string) {
    if (option === 'View details') {
      this.onViewDetailsClick();
    } else if (option === 'Share') {
      // TODO: Implement on Share click
    } else if (option === 'Put into confectionary') {
      this.apiService.toConfectionary(this.reward.id).pipe().subscribe(() => {
        this.rewardService.toConfectionaryTrigger.next(null);
      });
    } else if (option === 'Remove from confectionary') {
      this.apiService.RemoveFromConfectionary(this.reward.id).pipe().subscribe(() => {
        this.rewardService.toConfectionaryTrigger.next(null);
      });
    }
  }

  get OPTIONS() : Array<string> {
    return ['View details', ...(this.reward?.isConfectionary ? ['Remove from confectionary'] : ['Put into confectionary'])];
  }

  onViewDetailsClick() {
    this.modalService.openRewardPopup(this.reward.id);
  }
}
