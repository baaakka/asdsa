import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KolComponent } from './kol.component';

describe('KolComponent', () => {
  let component: KolComponent;
  let fixture: ComponentFixture<KolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
