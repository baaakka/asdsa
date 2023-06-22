import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { DropDownOption } from '../../../core/types/drop-down-option.interface';

@Component({
  selector: 'cake-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent {

  @ViewChild('dropDown') dropDown!: ElementRef;

  @Input() label!: string;

  @Input() options!: Array<DropDownOption>;

  @Input() placeholder!: string;

  @Output() chooseOption = new EventEmitter<DropDownOption>();
  
  @Input() error = '';

  isOpened = false;

  @Input() chosenOption!: DropDownOption;

    @HostListener('document:click', ['$event.target'])
    onCloseClick(target:  HTMLElement): void {
      const clickedInside = this.dropDown.nativeElement.contains(target);
  
      if (!clickedInside && this.isOpened) {
        this.isOpened = false
      }
    }
  }
