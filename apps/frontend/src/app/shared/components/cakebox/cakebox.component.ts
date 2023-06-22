import { Component, Input } from '@angular/core';
import { CakeBox } from '../../../core/types/cakebox.interface';

@Component({
  selector: 'cake-cakebox',
  templateUrl: './cakebox.component.html',
  styleUrls: ['./cakebox.component.scss'],
})
export class CakeboxComponent {
  @Input() isSmall = false;

  @Input() cakebox!: CakeBox;

  @Input() maxSize = 11;
}
