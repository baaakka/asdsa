import { AfterViewInit, Component, Inject, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkTheme, LightTheme } from './core/types/Themes';
import { SvgService } from './services/svg.service';
import { ThemeService } from './services/theme.service';
import { environment } from '../environments/environment';
import { DOCUMENT } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';
import { StateServerUpdates } from './core/constants/state-server-updates.enum';
import { TextsEnum } from './core/constants/texts.enum';

@Component({
  selector: 'cake-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'frontend';
  constructor(
    private themeService: ThemeService,
    private svgService: SvgService,
    private router: Router,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: Document,
    private swUpdate: SwUpdate,
  ) {
    this.themeService.changeActiveTheme(localStorage.getItem('theme') === 'dark-theme' ? DarkTheme : LightTheme);
    this.svgService.registerSvg();

    if (environment.plugin) {
      this.document.body.classList.add('plugin')
    }

  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((evt) => {
        if (evt.type === StateServerUpdates.VERSION_READY && confirm(TextsEnum.ConfirmToReload)) {
          window.location.reload();
        }
      });
    }
  }

  ngAfterViewInit(): void {
    if (environment.plugin) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      chrome.storage.sync.get('redirect', async ({ redirect }: any) => {

        // document.getElementById('reward-link')?.click();
        this.zone.run(() => {
          this.router.navigateByUrl(redirect)
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        await chrome.storage.sync.remove('redirect', () => {
          // Your code
          // This is an asyn function
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        await chrome.storage.local.remove('redirect', () => {
          // Your code
          // This is an asyn function
        });
      });

    }
  }
}
