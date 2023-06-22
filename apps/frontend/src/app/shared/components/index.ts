import { RewardsOptionsDirective } from "../directives/rewards-options-directive.directive";
import { TooltipDirective } from "../directives/tooltip.directive";
import { CakeboxComponent } from "./cakebox/cakebox.component";
import { CongratulationsScreenComponent } from "./congratulations-screen/congratulations-screen.component";
import { DownloadPluginComponent } from "./download-plugin/download-plugin.component";
import { DropDownComponent } from "./drop-down/drop-down.component";
import { InputComponent } from "./input/input.component";
import { KolComponent } from "./kol/kol.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { RewardComponent } from "./reward/reward.component";
import { RewardsOptionsComponent } from "./rewards-options/rewards-options.component";
import { TooltipComponent } from "./tooltip/tooltip.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { GetRewardComponent } from "./get-reward/get-reward.component";
import { CakeboxTransformPipe } from "../../core/pipes/cakebox-transform.pipe";
import { FollowersCountPipe } from "../../core/pipes/followers-count.pipe";
import { PageTitlePipe } from "../../core/pipes/page-title.pipe";
import { ConfirmPopupComponent } from "./confirm-popup/confirm-popup.component";
import { CakeTitlePipe } from '../../core/pipes/cake-title.pipe';
import { DeleteWalletComponent } from "./delete-wallet/delete-wallet.component";
import { AddWalletPopupComponent } from "./add-wallet-popup/add-wallet-popup.component";
import { WebClipComponent } from "./webclip/webclip.component";

export const COMPONENTS = [
    DropDownComponent,
    InputComponent,
    CongratulationsScreenComponent,
    DownloadPluginComponent,
    TooltipDirective,
    TooltipComponent,
    RewardComponent,
    KolComponent,
    RewardsOptionsDirective,
    RewardsOptionsComponent,
    PaginationComponent,
    WelcomeComponent,
    CakeboxComponent,
    FollowersCountPipe,
    CakeboxTransformPipe,
    PageTitlePipe,
    GetRewardComponent,
    ConfirmPopupComponent,
    CakeTitlePipe,
    DeleteWalletComponent,
    AddWalletPopupComponent,
    WebClipComponent
  ];
