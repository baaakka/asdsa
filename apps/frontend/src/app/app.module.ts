import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule, ToastContainerModule } from "ngx-toastr";
import { SharedModule } from "./shared/shared.module";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { HandleErrorInterceptor } from "./core/Interceptors/handle-error.interceptor";
import { Web3Module } from "@cake/web3";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { MatSelectModule } from '@angular/material/select';


@NgModule({
	declarations: [AppComponent, HeaderComponent, FooterComponent, ContentLayoutComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ToastrModule.forRoot(),
		ToastContainerModule,
		SharedModule,
		NgxSkeletonLoaderModule.forRoot({ animation: "pulse", loadingText: "This item is actually loading..." }),
		Web3Module,
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: "registerWhenStable:30000",
		}),
		MatSelectModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HandleErrorInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
