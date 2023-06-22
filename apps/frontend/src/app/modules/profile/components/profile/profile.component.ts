import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Watcher } from '../../../../shared/classes/watcher';
import { filter, map, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { ModalsService } from '../../../../services/modals.service';
import { FormControl } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';

import { AuthService } from '../../../../services/auth.service';
import { MapperService } from '../../../../services/mapper.service';
import { Query } from '../../../../core/types/query.interface';
import { RewardItem, UserProfile } from '@cake/lib-api-interface';
import { LightTheme, Theme } from '../../../../core/types/Themes';
import { ThemeService } from '../../../../services/theme.service';


@Component({
  selector: 'cake-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends Watcher implements OnInit {
  isProfileOnly = this.activatedRoute.data.pipe(map((data) => {
    return !data['settings'];
  }))
  isErrorVisible = this.modalService.hasUsernameExistError$.pipe(map(data => data))

  profileSLices: string[] = []
  profileNameControl!: FormControl<string>
  userProfile!: UserProfile
  profileInfoData: Array<{ label: string; value: number; }> = [];
  cakeboxActivePage = 1
  cakeBoxes: RewardItem[] = []

  mockArrayData = Array(10).fill('')

  readonly QUERY: Query = {
    page: 1,
    pageSize: 10,
  }
  cakeboxTotal!: number;

  readonly MOCK_PLATFORMS = [
    {
      platform: "Youtube",
      isPopular: true
    },
    {
      platform: "Twitch",
      isPopular: false
    },
    {
      platform: "Linkedin",
      isPopular: false
    },
    {
      platform: "Vimeo",
      isPopular: false
    },
    {
      platform: "Reddit",
      isPopular: false
    }
  ];
  wasNameChanged = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalsService,
    private apiService: ApiService,
    private authService: AuthService,
    private mapper: MapperService,
    private themeService: ThemeService
  ) {
    super()
  }

  ngOnInit(): void {
    this.subscribes()
  }

  signOut(){
    this.authService.signOut();
  }

  subscribes() {
    (this.authService.userProfile as Observable<UserProfile>).
      pipe(
        filter<UserProfile>(Boolean),
        takeUntil(this.unsubscribe),
        tap((data: UserProfile) => {
          this.userProfile = data;
          this.profileInfoData = this.mapper.userProfileMapper(this.userProfile);
          this.profileNameControl = new FormControl(this.userProfile.username) as FormControl<string>;
        }),
        switchMap((result: UserProfile) => this.apiService.getUserById(result.id, this.QUERY)),
        tap(data => {
          this.profileSLices = data.data.rewards.map(slice => slice.smallImage);
        }))
      .subscribe()

    this.getCakeboxes()
  }

  get cakeboxQuery(): Query {
    return {
      page: this.cakeboxActivePage,
      pageSize: 3,
      sort: 'cost',
      where: 'CAKEBOX',
      owner: true
    };
  }

  formatter(val: string) {
    return val.split(' ').map((val)=> val === 'Slices' ? "NFTs" : val).join(' ')
  }

  getCakeboxes() {
    this.apiService.getRewards(this.cakeboxQuery).pipe(
      takeUntil(this.unsubscribe),
      tap(data => {
        this.cakeBoxes = data.data;
        this.cakeboxTotal = data.count;
      })
    ).subscribe()
  }

  getPlatforms() {
    // it's mock

    return this.MOCK_PLATFORMS;
  }

  public get activeTheme() : Theme {
    return this.themeService.active;
  }


  public get profileImg(): string {
    return this.authService.randomAvatar;
  }

  get isErrorMessageVisible() {
    return this.userProfile ? this.userProfile.username === this.profileNameControlValue : false
  }

  onSaveButtonClick() {
    if (!this.isErrorMessageVisible) {
      this.modalService.openSettingsConfirmationPopup(this.profileNameControlValue, this.userProfile.id)
    }
  }

  get enteredInvalidName() {
    return this.profileNameControlValue.trim().length === 0
  }

  get profileNameControlValue() {
    return this.profileNameControl.value
  }

  get plusSvg() {
    return this.activeTheme === LightTheme ? 'plus-light' : 'plus-dark';
  }

  get editIcon() {
    return this.activeTheme === LightTheme ? 'edit-light' : 'edit-dark';
  }

  getPrefix(platform: string) {
    return platform === 'Youtube' ? 'big' : 'small'
  }

  handleInput() {
    this.wasNameChanged = true;
  }
}
