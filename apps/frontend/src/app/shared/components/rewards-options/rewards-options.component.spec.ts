import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsOptionsComponent } from './rewards-options.component';

describe('RewardsOptionsComponent', () => {
  let component: RewardsOptionsComponent;
  let fixture: ComponentFixture<RewardsOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RewardsOptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RewardsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
