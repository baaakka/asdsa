import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RewardEnum, RewardItem } from '@cake/lib-api-interface';

import { takeUntil } from 'rxjs';
import { LightTheme, Theme } from '../../../core/types/Themes';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { ModalsService } from '../../../services/modals.service';
import { ThemeService } from '../../../services/theme.service';
import { Watcher } from '../../classes/watcher';

@Component({
  selector: 'cake-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss'],
})
export class RewardComponent extends Watcher implements OnInit, OnDestroy {
  rewardEnum = RewardEnum;

  reward!: RewardItem;

  showHistory = false;

  showFullHistory = false;

  language = 'en'

  public get activeTheme() : Theme {
    return this.themeService.active;
  }

  public get userId() : string {
    return this.authService.getDecodedToken()?.data.id || '';
  }


  constructor(
    public dialogRef: MatDialogRef<RewardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id:string, isClaimed: boolean },
    private apiService: ApiService,
    private themeService: ThemeService,
    private modalService: ModalsService,
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.apiService.getRewardById(this.data.id).pipe(takeUntil(this.unsubscribe)).subscribe((reward) => {
      this.reward = reward.data;
    })

    this.getLanguage() 
  }

  getLanguage() {
		this.language = localStorage.getItem("lang") || "en";
	}

  getReward() {
    this.modalService.getRewardPopup(this.reward);
    this.dialogRef.close()
  }

  claimCakebox() {
    this.apiService.claimCakebox(this.reward.id).pipe(takeUntil(this.unsubscribe)).subscribe();
    this.dialogRef.close()
  }

  putIntoConfectionary() {
    this.apiService.toConfectionary(this.reward.id).pipe(takeUntil(this.unsubscribe)).subscribe(()=> {
      this.reward.isConfectionary = true;
    });
  }

  removeFromConfectionary() {
    this.apiService.RemoveFromConfectionary(this.reward.id).pipe(takeUntil(this.unsubscribe)).subscribe(()=> {
      this.reward.isConfectionary = false;
    });
  }


  get closeCircle() {
      return this.activeTheme === LightTheme ? 'close-light' : 'close-dark';
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
