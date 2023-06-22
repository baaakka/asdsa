import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AddWalletPopupComponent } from "./add-wallet-popup.component";

describe("AddWalletPopupComponent", () => {
	let component: AddWalletPopupComponent;
	let fixture: ComponentFixture<AddWalletPopupComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddWalletPopupComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AddWalletPopupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
