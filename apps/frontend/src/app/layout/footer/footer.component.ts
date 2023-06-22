import { Component, OnInit } from '@angular/core';
import { UserProfile } from '@cake/lib-api-interface';
import { environment } from '../../../environments/environment';
import { Observable, filter, takeUntil, tap, switchMap } from 'rxjs';
import { Query } from '../../core/types/query.interface';
import { LightTheme } from '../../core/types/Themes';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Watcher } from '../../shared/classes/watcher';

@Component({
  selector: 'cake-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends Watcher implements OnInit {

  readonly QUERY: Query = {
    page: 1,
    pageSize: 8,
  }
  footerSlices: string[] = [];

  constructor(
    public themeService: ThemeService,
    private authService: AuthService,
    private apiService: ApiService
    ){
    super()
  }

  language = 'en'


  ngOnInit(): void {
    if (this.isPlugin) {
      this.subscribes()
    }
    this.getLanguage()

  }

  getLanguage() {
		this.language = localStorage.getItem("lang") || "en";
	}


  subscribes() {
    (this.authService.userProfile as Observable<UserProfile>).
    pipe(
      filter<UserProfile>(Boolean),
      takeUntil(this.unsubscribe),
      switchMap((result: UserProfile) => this.apiService.getUserById(result.id, this.QUERY)),
      tap(data => {
        this.footerSlices = data.data.rewards.map(slice => slice.smallImage);
      }))
    .subscribe()
  }

  get footerImage() {
    return this.themeService.active === LightTheme ? 'footer-light' : 'footer-dark'
  }

  get mobileFooterImage() {
    return this.themeService.active === LightTheme ? 'footer_light_mobile' : 'footer_dark_mobile'
  }

  get isPlugin() {
    return environment.plugin
  }
}
