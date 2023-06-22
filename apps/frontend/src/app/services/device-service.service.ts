import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private deviceDetector: DeviceDetectorService) { }

  get isMobileOrTablet(): boolean {
    return this.deviceDetector.isMobile() || this.deviceDetector.isTablet();
  }

  get deviseName(): string {
    return this.deviceDetector.device;
  }

  get os(): string {
    return this.deviceDetector.os;
  }

  get browser(): string {
    return this.deviceDetector.browser;
  }
}
