/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserEnum } from '../../../core/constants/browsers';
import { DevicesEnum } from '../../../core/constants/devices.enum';
import { DeviceService } from '../../../services/device-service.service';

@Component({
  selector: 'cake-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit {
  @ViewChild('ref') ref!: ElementRef;
  @Input() label = '';

  @Input() id!: string;

  @Input() defaultType = 'text';

  @Input() placeholder = '';

  @Input() error = '';

  @Input() hasError = false;

  @Input() hasEye = false;

  @Input() defaultValue: number | string = '';

  @Input() control: any;

  @Input() hasCloseCircle = false;

  @Output() inputEmitter = new EventEmitter<number | string>();

  @Output() inputClose = new EventEmitter<any>();

  onFocus = false;

  eyeHidden = true;

  type = 'text';

  public get isIphoneSafari(): boolean {  
    return this.deviceService.browser === BrowserEnum.SAFARI && this.deviceService.deviseName === DevicesEnum.IPHONE;
  }

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.type = this.defaultType;
  }

  onFocusDetect(boolean: boolean) {
    this.onFocus = boolean;
  }

  onChange: any = () => {};
  onTouch: any = () => {};
  set value(val: any) {
    this.onChange(val);
    this.onTouch(val);
  }

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  onClosePressed() {
    this.inputClose.emit();
  }
}
