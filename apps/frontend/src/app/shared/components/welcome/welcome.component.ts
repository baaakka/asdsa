import { Component, OnDestroy, OnInit } from '@angular/core';
import { RewardEnum, RewardItem, SortRewardEum } from '@cake/lib-api-interface';
import { takeUntil } from 'rxjs';
import { Query } from '../../../core/types/query.interface';
import { ApiService } from '../../../services/api.service';
import { ModalsService } from '../../../services/modals.service';
import { Watcher } from '../../classes/watcher';

@Component({
  selector: 'cake-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent extends Watcher implements OnInit, OnDestroy {

  cakeboxes!: RewardItem[];

  count = 0;

  get getQueryObj(): Query {
    return {
      pageSize: 5,
      sort: SortRewardEum.Rarity,
      where: RewardEnum.CAKEBOX,
      isConfectionary: false,
      owner: true,
    };
  }

  get hasInitialBoxes(): boolean {
    return !!this.cakeboxes?.find(box => box.initial);
  }

  constructor(private apiService: ApiService, private modalsService: ModalsService) {
    super();
  }

  ngOnInit(): void {
    this.getBoxes();
  }

  claim(id: string) {
    this.modalsService.openClaimCakeboxPopup(id);
    this.modalsService.handleClaimed.pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.getBoxes();
    })
  }

  getBoxes() {
    this.apiService
      .getRewards(this.getQueryObj)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((boxes) => {
        this.cakeboxes = boxes.data;
        this.count = boxes.count;
      });
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
