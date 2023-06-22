import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
    toConfectionaryTrigger = new Subject<null>();
}
