import { Component, Input } from '@angular/core';

@Component({
  selector: 'cake-congratulations-screen',
  templateUrl: './congratulations-screen.component.html',
  styleUrls: ['./congratulations-screen.component.scss'],
})
export class CongratulationsScreenComponent {
  @Input() title!: string;
  @Input() titleImg!: string;
  @Input() mark!: string;
  @Input() text!: string;
  @Input() isNeedPlugin!: boolean;
  @Input() router = '/';
  @Input() btnText!: string;
}
