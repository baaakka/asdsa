import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { WEBCLIP_BANNER_CLOSED } from '../../core/constants/local-storage-keys';
import { DeviceService } from '../../services/device-service.service';
import { Watcher } from '../../shared/classes/watcher';

@Component({
  selector: 'cake-app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent extends Watcher implements OnDestroy {
  hideDefaultHeader = false;
  hideDefaultFooter = false;
  isPopupVisible: boolean;

  routesToHideHeader: string[] = [
    '/auth/sign-up',
    '/auth/sign-in',
  ];

  routesToHideFooter: string[] = [
    '/auth/sign-up',
    '/auth/sign-in',
  ];

  constructor(
    private router: Router,
    private deviseService: DeviceService
  ) {
    super()
    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(async (ev) => {
      if (ev instanceof NavigationEnd) {
        this.hideDefaultHeader = this.routesToHideHeader.some((url) => ev.url.indexOf(url) !== -1);
        this.hideDefaultFooter = this.routesToHideFooter.some((url) => ev.url.indexOf(url) !== -1);
      }
    });

    this.isPopupVisible = this.deviseService.isMobileOrTablet;
  }

  handlePopupClose(value: boolean) {
    this.isPopupVisible = value;
  }

  get isHidden() {
    return !JSON.parse(<string>localStorage.getItem(WEBCLIP_BANNER_CLOSED))
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
