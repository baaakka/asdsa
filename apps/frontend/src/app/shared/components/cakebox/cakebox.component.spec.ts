import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeboxComponent } from './cakebox.component';

describe('CakeboxComponent', () => {
  let component: CakeboxComponent;
  let fixture: ComponentFixture<CakeboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CakeboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CakeboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
