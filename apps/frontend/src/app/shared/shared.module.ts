import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppMaterialModule } from "../app-material.module";
import { TooltipDirective } from "./directives/tooltip.directive";
import { RouterModule } from "@angular/router";
import { COMPONENTS } from "./components";
import { RewardsOptionsDirective } from "./directives/rewards-options-directive.directive";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

const MODULES = [CommonModule, ReactiveFormsModule, FormsModule, AppMaterialModule, RouterModule, NgxSkeletonLoaderModule];

const DIRECTIVES = [TooltipDirective, RewardsOptionsDirective];

@NgModule({
	declarations: [...COMPONENTS], //DIRECTIVES
	imports: [...MODULES],
	exports: [...MODULES, ...COMPONENTS, DIRECTIVES], //DIRECTIVES
})
export class SharedModule {}
