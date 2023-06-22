import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private formControl!: FormControl;

  setFormControl(control: FormControl) {
    this.formControl = control;
  }

  getFormControl() {
    return this.formControl;
  }
}
