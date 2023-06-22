import { Component, NgZone, OnInit } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { SearchService } from "../../services/search.service";
import { ActivatedRoute, Data, NavigationEnd, Router, RoutesRecognized } from "@angular/router";
import { filter, pairwise, takeUntil } from "rxjs";
import { Location } from "@angular/common";
import { Watcher } from "../../shared/classes/watcher";
import { AuthService } from "../../services/auth.service";
import { DarkTheme, LightTheme } from "../../core/types/Themes";
import { ModalsService } from "../../services/modals.service";
import { HeaderOptions } from "../../core/types/header-options.interface";
import { FormControl } from "@angular/forms";

@Component({
	selector: "cake-app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent extends Watcher implements OnInit {
	isSearchOpened = false;

	redirectTo = "";

	settings = false;

	isMobileHeaderVisible = false;

	isDesktopHeaderVisible = false;

	headerOptions!: HeaderOptions;

	headerSet = false;

	myControl = new FormControl();

	language!: string;

	public get profileImg(): string {
		return this.authService.randomAvatar;
	}

	public get isMobileContent(): boolean {
		return window.innerWidth <= 810;
	}

	dropdownOptions = [
		{ label: "English", value: "en" },
		{ label: "Ukrainian", value: "ua" },
	];

	constructor(
		public themeService: ThemeService,
		private location: Location,
		private searchService: SearchService,
		private router: Router,
		public authService: AuthService,
		private zone: NgZone,
		private modalService: ModalsService,
		private route: ActivatedRoute
	) {
		super();
	}

	ngOnInit(): void {
		this.router.events
			.pipe(
				filter((event) => event instanceof RoutesRecognized),
				pairwise(),
				takeUntil(this.unsubscribe)
			)
			.subscribe({
				next: (events) => {
					this.redirectTo = (events as RoutesRecognized[])[0].urlAfterRedirects;
				},
			});

		this.setRouterData();
		this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((val) => {
			if (val instanceof NavigationEnd) {
				this.setRouterData();
			}
		});

    this.getLanguage()
	}

	onDropdownChange(event: any) {
		localStorage.setItem("lang", event.value);
    window.location.reload()
	}

	getLanguage() {
		this.language = localStorage.getItem("lang") || "en";
		this.myControl.setValue(this.language);
	}

	setRouterData() {
		this.headerOptions = this.route.snapshot?.firstChild?.data["headerOptions"];
		this.settings = this.route.snapshot?.firstChild?.firstChild?.data["settings"];
	}

	switchSearchState() {
		this.isSearchOpened = !this.isSearchOpened;
	}

	back() {
		if (!this.redirectTo) {
			this.zone.run(() => {
				this.router.navigateByUrl("/");
			});
			return;
		}
		this.location.back();
	}

	receiveFormControl() {
		return this.searchService.getFormControl();
	}

	//FOR MVP1
	changeTheme(boolean: boolean): void {
		this.themeService.changeActiveTheme(boolean ? DarkTheme : LightTheme);
	}

	get headerImage() {
		return this.activeTheme === LightTheme ? "header-light" : "header-dark";
	}

	addWallet() {
		this.modalService.openAddingWalletPopup();
	}

	get activeTheme() {
		return this.themeService.active;
	}
}
