import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CommonModule } from '@angular/common';
import { WINDOW_PROVIDERS } from './provider';

@NgModule({
  imports: [CommonModule],
  providers: [WINDOW_PROVIDERS],
})
export class Web3Module {
  constructor(@Optional() @SkipSelf() parentModule: Web3Module) {
    if (parentModule) {
      throw new Error('Web3Module is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<Web3Module> {
    return {
      ngModule: Web3Module,
      providers: [],
    };
  }
}
