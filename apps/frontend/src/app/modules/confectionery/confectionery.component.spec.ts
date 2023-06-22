import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfectioneryComponent } from './confectionery.component';

describe('ConfectioneryComponent', () => {
  let component: ConfectioneryComponent;
  let fixture: ComponentFixture<ConfectioneryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfectioneryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfectioneryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
