import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class Watcher implements OnDestroy {
  protected unsubscribe = new ReplaySubject();

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}