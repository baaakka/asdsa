import { Component, OnDestroy, OnInit } from '@angular/core';
import { KolItem, RewardEnum, RewardItem, Role, SortRewardEum } from '@cake/lib-api-interface';
import { Subject, takeUntil } from 'rxjs';
import { Pagination } from '../../core/types/pagination.interface';
import { Query } from '../../core/types/query.interface';
import { Theme } from '../../core/types/Themes';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ModalsService } from '../../services/modals.service';
import { ThemeService } from '../../services/theme.service';
import { Watcher } from '../../shared/classes/watcher';

enum TypesLists {
  Slices = 'Slices',
  Cakeboxes = 'Cakeboxes',
  Kol = 'Kol',
}

@Component({
  selector: 'cake-confectionery',
  templateUrl: './confectionery.component.html',
  styleUrls: ['./confectionery.component.scss'],
})
export class ConfectioneryComponent extends Watcher implements OnInit, OnDestroy {
  typesLists = TypesLists;

  slices: Array<RewardItem> = [];

  cakeboxes: Array<RewardItem> = [];

  users: Array<KolItem> = [];

  language = 'en'

  scrollSubject = new Subject<{ number: number; type: TypesLists }>();

  slicePagination: Pagination<number> = {
    page: 1,
    pageSize: 28,
    count: 0,
    data: 0,
  };

  cakeboxPagination: Pagination<number> = {
    page: 1,
    pageSize: 8,
    count: 0,
    data: 0,
  };

  usersPagination: Pagination<number> = {
    page: 1,
    pageSize: 7,
    count: 0,
    data: 0,
  };

  get getSliceQueryObj(): Query {
    return {
      page: this.slicePagination.page,
      pageSize: this.slicePagination.pageSize,
      where: RewardEnum.SLICE,
      sort: SortRewardEum.CreatedAt,
      isConfectionary: true,
    };
  }

  get getCakeboxQueryObj(): Query {
    return {
      page: this.cakeboxPagination.page,
      pageSize: this.cakeboxPagination.pageSize,
      where: RewardEnum.CAKEBOX,
      sort: SortRewardEum.CreatedAt,
      isConfectionary: true,
    };
  }

  get getUsersQueryObj(): Query {
    return {
      page: this.usersPagination.page,
      pageSize: this.usersPagination.pageSize,
      where: Role.kol,
    };
  }

  public get getRandomAvatar(): string {
    return this.authService.randomAvatar;
  }

  public get activeTheme(): Theme {
    return this.themeService.active;
  }

  constructor(
    private apiService: ApiService,
    public modalsService: ModalsService,
    private authService: AuthService,
    private themeService: ThemeService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getSlices(0);
    this.getCakeboxes(0);
    this.getUsers(0);
    this.getLanguage()
  }


  getLanguage() {
		this.language = localStorage.getItem("lang") || "en";
	}


  getMockArray(number: number) {
    return Array(number);
  }

  getSlices(number: number) {
    this.apiService
      .getRewards(this.getSliceQueryObj)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        this.slices = this.slices.concat(res.data);
        this.slicePagination = { ...res, data: number };
      });
  }

  getCakeboxes(number: number) {
    this.apiService
      .getRewards(this.getCakeboxQueryObj)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        this.cakeboxes = this.cakeboxes.concat(res.data);
        this.cakeboxPagination = { ...res, data: number };
      });
  }

  getUsers(number: number) {
    this.apiService
      .getUsers(this.getUsersQueryObj)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        this.users = this.users.concat(res.data);
        this.usersPagination = { ...res, data: number };
      });
  }

  getCeilNumber(number: number): number {
    return Math.ceil(number);
  }

  get getOffsetWidth(): number {
    return document.getElementsByTagName('body')[0].offsetWidth;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
