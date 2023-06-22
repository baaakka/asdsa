import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KolItem, RewardItem } from '@cake/lib-api-interface';
import { takeUntil } from 'rxjs';
import { Query } from '../../../core/types/query.interface';
import { Theme } from '../../../core/types/Themes';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { ModalsService } from '../../../services/modals.service';
import { ThemeService } from '../../../services/theme.service';
import { Watcher } from '../../classes/watcher';

@Component({
  selector: 'cake-kol',
  templateUrl: './kol.component.html',
  styleUrls: ['./kol.component.scss'],
})
export class KolComponent extends Watcher implements OnInit, OnDestroy {
  kol!: KolItem;

  page = 1;

  pageSize = 9;

  totalCount!: number;

  public get profileImg(): string {
    return this.authService.randomAvatar;
  }

  public get activeTheme(): Theme {
    return this.themeService.active;
  }

  public get getRewards(): Array<RewardItem> {
    return this.kol.rewards as Array<RewardItem>;
  }

  get getQueryObj(): Query {
    return {
      page: this.page,
      pageSize: this.pageSize,
    };
  }

  constructor(
    public dialogRef: MatDialogRef<KolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: KolItem,
    private apiService: ApiService,
    public dialog: MatDialog,
    public modalsService: ModalsService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getUser();
  }

  getMockArray(number: number) {
    return Array(number);
  }

  getUser() {
    this.apiService
      .getUserById(this.data.user.id, this.getQueryObj)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((kol) => {
        this.kol = { ...this.data };
        this.kol.rewards = kol.data.rewards;
        this.page = kol.page;
        this.pageSize = kol.pageSize;
        this.totalCount = kol.count;
      });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
