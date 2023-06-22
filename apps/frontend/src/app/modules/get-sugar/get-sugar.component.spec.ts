import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSugarComponent } from './get-sugar.component';

describe('GetSugarComponent', () => {
  let component: GetSugarComponent;
  let fixture: ComponentFixture<GetSugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetSugarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetSugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
