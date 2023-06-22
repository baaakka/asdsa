import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRewardComponent } from './get-reward.component';

describe('GetRewardComponent', () => {
  let component: GetRewardComponent;
  let fixture: ComponentFixture<GetRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetRewardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
