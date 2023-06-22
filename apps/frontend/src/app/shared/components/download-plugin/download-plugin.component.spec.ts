import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPluginComponent } from './download-plugin.component';

describe('DownloadPluginComponent', () => {
  let component: DownloadPluginComponent;
  let fixture: ComponentFixture<DownloadPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadPluginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
