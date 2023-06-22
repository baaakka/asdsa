import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSugarComponent } from './select-sugar.component';

describe('SelectSugarComponent', () => {
  let component: SelectSugarComponent;
  let fixture: ComponentFixture<SelectSugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectSugarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectSugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
