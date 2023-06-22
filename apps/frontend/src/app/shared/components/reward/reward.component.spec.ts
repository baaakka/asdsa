import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardComponent } from './reward.component';

describe('SliceComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RewardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
