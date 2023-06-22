import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainListComponentsEnum } from './core/constants/main-list-components.enum';
import { AccessGuard } from './core/guards/access.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/main/main.module').then((m) => m.MainModule),
        data: {
          webAllowed: false,
          pluginAllowed: true,
          headerOptions: {
            default: true,
          }
        },
        canActivate: [AccessGuard],
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/main/main.module').then((m) => m.MainModule),
        data: {
          webAllowed: false,
          pluginAllowed: true,
          headerOptions: {
            default: true,
          }
        },
        canActivate: [AuthGuard, AccessGuard],
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [AuthGuard, AccessGuard],
        data: {
          webAllowed: true,
          pluginAllowed: true,
          headerOptions: {
            default: false,
            title: '',
            back: true,
            isProfile: true,
          }
        }
      },
      {
        path: 'grab-a-slice/:id',
        loadChildren: () =>
          import('./modules/main-list/main-list.module').then((m) => m.MainListModule),
        data: {
          page: MainListComponentsEnum.Grab,
          webAllowed: true,
          pluginAllowed: false,
          headerOptions: {
            default: false,
            title: 'Grab a slice',
            titleIcon: 'reward',
            showSugar: true,
            back: true,
            hasSearch: true,
          }
        },
        canActivate: [AuthGuard, AccessGuard]
      },
      {
        path: 'rewards/:id',
        loadChildren: () =>
          import('./modules/main-list/main-list.module').then((m) => m.MainListModule),
        data: {
          page: MainListComponentsEnum.Rewards,
          webAllowed: true,
          pluginAllowed: true,
          headerOptions: {
            default: false,
            title: 'Reward',
            titleIcon: 'reward',
            showSugar: true,
            back: true,
            hasSearch: true,
          }
        },
        canActivate: [AuthGuard, AccessGuard]
      },
      {
        path: 'confectionery',
        loadChildren: () =>
          import('./modules/confectionery/confectionery.module').then((m) => m.ConfectioneryModule),
        canActivate: [AuthGuard, AccessGuard],
        data: {
          webAllowed: true,
          pluginAllowed: true,
          headerOptions: {
            default: false,
            title: 'Confectionery',
            titleIcon: 'confectionary',
            showSugar: true,
            back: true,
          }
        }
      },
      {
        path: 'get-sugar',
        loadChildren: () =>
          import('./modules/get-sugar/get-sugar.module').then((m) => m.GetSugarModule),
        canActivate: [AuthGuard, AccessGuard],
        data: {
          webAllowed: true,
          pluginAllowed: true,
          headerOptions: {
            default: true,
          }
        }
      },
      {
        path: 'wallet',
        loadChildren: () =>
          import('./modules/wallet/wallet.module').then((m) => m.WalletModule),
        canActivate: [AuthGuard, AccessGuard],
        data: {
          webAllowed: true,
          pluginAllowed: true,
          headerOptions: {
            default: false,
            title: 'Wallet',
            titleIcon: 'wallet',
            showSugar: true,
            back: true,
            isWallet: true,
          }
        }
      },
      {
        path: 'rewards',
        redirectTo: 'rewards/SLICE'
      },
      {
        path: 'grab-a-slice',
        redirectTo: 'confectionery'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
