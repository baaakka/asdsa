import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'cake-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  destroyed$ = new BehaviorSubject<boolean>(true)
  tooltip = '';
  left = 0;
  top = 0;

  destroy() {
    this.destroyed$.next(false);
    this.destroyed$.complete();
  }
}
