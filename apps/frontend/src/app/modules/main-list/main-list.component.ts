/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { SortRewardEum, SortUserEum } from '@cake/lib-api-interface';
import { KolItem, RewardItem } from 'libs/lib-api-interface/src/lib/response';
import { BehaviorSubject, debounceTime, takeUntil } from 'rxjs';
import { MainListComponentsEnum } from '../../core/constants/main-list-components.enum';
import { kolSortOptions, rewardsSortOptions } from '../../core/constants/sorting-options';
import { TabsFromListEnum } from '../../core/constants/tabs-from-list.enum';
import { DropDownOption } from '../../core/types/drop-down-option.interface';
import { Pagination } from '../../core/types/pagination.interface';
import { Query } from '../../core/types/query.interface';
import { Theme } from '../../core/types/Themes';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ModalsService } from '../../services/modals.service';
import { RewardService } from '../../services/reward.service';
import { SearchService } from '../../services/search.service';
import { ThemeService } from '../../services/theme.service';
import { Watcher } from '../../shared/classes/watcher';

@Component({
  selector: 'cake-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
})
export class MainListComponent extends Watcher implements OnInit, OnDestroy {

  MOCK_FOLLOWERS = [123000, 1000, 500, 45000, 2500000];

  searchControl = new FormControl('');

  activeTab: TabsFromListEnum = TabsFromListEnum.Kol;

  tabsFromListEnum = TabsFromListEnum;

  mainListComponentsEnum = MainListComponentsEnum;

  waitingLoading = true;

  where = '';

  sortValue = '';

  width = 0;   

  currentPage = 1;

  pageSize = window.innerWidth <= 768 ? 10 : 5;

  totalCount!: number

  page!: MainListComponentsEnum;

  rewardList: Array<RewardItem> = [];

  kolList: Array<KolItem> = [];

  kolSortOptions: Array<DropDownOption> = kolSortOptions;

  rewardsSortOptions: Array<DropDownOption> = rewardsSortOptions;

  resize$ = new BehaviorSubject<number>(window.innerWidth);

  smallScreen!: boolean;

  hasMatches = true;

  language = 'en'
    
  get sortOptions(): Array<DropDownOption> {
    return this.page === this.mainListComponentsEnum.Rewards ? this.rewardsSortOptions : this.kolSortOptions;
  }

  get getQueryObj(): Query {
    return {
      page: this.currentPage,
      pageSize: this.pageSize,
      sort: this.sortValue,
      search: this.searchControl.value || '',
      owner: this.smallScreen,
      ...(!this.smallScreen ? {where: this.where}: {})
    };
  }

  get userId(): string {
    return this.authService.getDecodedToken()?.data.id || '';
  }

  
  public get profileImg() : string {
    return this.authService.randomAvatar;
  }


  activityImg(index:number){
    return `assets/icons/activity${index}.svg`;
  }

  rankImg(index:number){
    return `assets/icons/top${index}.svg`;
  }

  hypeImg(index:number){
    return `assets/icons/hype${index}.svg`;
  }
  
  
  public get activeTheme() : Theme {
    return this.themeService.active;
  }

  @HostListener('window:resize')
  onResize() {
    if ((this.width !== window.innerWidth)) {
      this.width = window.innerWidth;
      this.resize$.next(window.innerWidth)
    }
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private searchService: SearchService,
    private authService: AuthService,
    public modalsService: ModalsService,
    private themeService: ThemeService,
    private rewardService: RewardService

  ) {
    super();
    this.searchService.setFormControl(this.searchControl);
  }

  getCostColor(value: number): string {
    return this.themeService.getClassForColors(value);
  }


  ngOnInit(): void {
    this.activeTab = this.route.snapshot.paramMap.get('id') as TabsFromListEnum;
    this.where = this.activeTab;
    this.resize$.next(window.innerWidth)
    this.checkDataFromRouter();
    this.triggerTabs();
    this.resizeChecker();
    this.searching();
    this.toConfectionaryChecker();
    this.getLanguage()
  }


  getLanguage() {
		this.language = localStorage.getItem("lang") || "en";
	}

  toConfectionaryChecker() {
      this.rewardService.toConfectionaryTrigger.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
        this.getData();
      })
  };

  resizeChecker() {
    this.resize$.pipe(debounceTime(250)).subscribe(width => {
        this.smallScreen = width <= 768;
        this.getData();
    })
  }

  getMockArray(number: number) {
    return Array(number);
  }

  getNameBasedOnTab(): string {
    switch (this.activeTab) {
      case TabsFromListEnum.Kol:
        return 'User name';
      case TabsFromListEnum.Users:
        return 'User name';
      case TabsFromListEnum.Slices:
        return 'Slice name';
      case TabsFromListEnum.Cak3boxes:
        return 'Cak3boxes name';
      case TabsFromListEnum.Trends:
        return 'Item name';
    }
    return 'Name';
  }

  searching() {
    this.searchControl.valueChanges
      .pipe(takeUntil(this.unsubscribe), debounceTime(500))
      .subscribe(() => {
        this.currentPage = 1;
        this.getData()
      });
  }

  checkDataFromRouter() {
    this.route.data
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((resolved: Data) => {
        this.page = resolved['page'];
        this.getData();
      });
  }

  setPagination(res: Pagination<unknown>) {
    this.totalCount = res.count;
    this.currentPage = res.page;
    this.pageSize = res.pageSize;
    this.waitingLoading = false;    
  }

  getData() {
    this.hasMatches = true;
    this.waitingLoading = true;
    if (this.page === MainListComponentsEnum.Grab) {
      this.sortValue = this.sortValue || SortUserEum.CreatedAt;
      this.apiService
        .getUsers(this.getQueryObj)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res) => {
          this.hasMatches = !(!res.data.length && this.getQueryObj.search?.length)
          this.kolList = res.data;
          this.setPagination(res);

        });
    } else {
      this.sortValue = this.sortValue || SortRewardEum.Cost;
      this.apiService
        .getRewards(this.getQueryObj)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res) => {
          this.hasMatches = !(!res.data.length && this.getQueryObj.search?.length)
          this.rewardList = res.data;
          this.setPagination(res);
        });
    }
  }

  triggerTabs() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.activeTab = val.url.split('/')[
          val.url.split('/').length - 1
        ] as TabsFromListEnum;
        if (!Object.values(MainListComponentsEnum).includes(this.activeTab as unknown as MainListComponentsEnum)) {
          this.where = this.activeTab;
        }
        this.currentPage = 1;
        this.checkDataFromRouter();
      }
    });
  }

  sort(option: DropDownOption) {
    this.sortValue = option.value;
    this.getData();
  }

  notAllowedTabs(tabs: TabsFromListEnum[]): boolean {
    return !tabs.includes(this.activeTab);
  }

  follow(id: string) {
    this.apiService.follow(id).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.kolList = this.kolList.map(kol => kol.user.id === id ? {...kol, ...{user: {...kol.user, isFollow: true}, followers: kol.followers + 1}} : kol)
    })
  }

  unfollow(id: string) {
    this.apiService.unfollow(id).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.kolList = this.kolList.map(kol => kol.user.id === id ? {...kol, ...{user: {...kol.user, isFollow: false}, followers: kol.followers - 1}} : kol)
    })
  }



  override ngOnDestroy(): void {
    //  this.urlService.unsubscribeObsv()

    super.ngOnDestroy();
  }

}
