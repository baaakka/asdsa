import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrowserEnum } from '../../../core/constants/browsers';
import { WEBCLIP_BANNER_CLOSED } from '../../../core/constants/local-storage-keys';
import { DeviceService } from '../../../services/device-service.service';

@Component({
  selector: 'cake-webclip',
  templateUrl: './webclip.component.html',
  styleUrls: ['./webclip.component.scss']
})
export class WebClipComponent {

  @Input() visible = true;
  @Input() isPopup = true;
  @Output() closePopupEmitter = new EventEmitter<boolean>();


  constructor(private deviseService: DeviceService) {
  }

  get browserSettingsIcon(): string {
    switch (this.deviseService.browser) {
      case BrowserEnum.SAFARI:
        return 'safari-webclip';
      case BrowserEnum.INSTACLIP:
      case BrowserEnum.CHROME:
        return 'chrome-webclip';
      case BrowserEnum.SAMSUNG:
        return 'samsung-webclip';
      case BrowserEnum.HUAWEI:
      case BrowserEnum.EDGE:
        return 'edge-webclip';
      default:
        return 'chrome-webclip'
    }
  }


  closePopup() {
    this.visible = false;
    localStorage.setItem(WEBCLIP_BANNER_CLOSED, JSON.stringify(true));
    this.closePopupEmitter.emit(this.visible);
  }

}
