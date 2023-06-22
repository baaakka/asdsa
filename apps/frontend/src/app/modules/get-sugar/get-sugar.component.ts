import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Watcher } from '../../shared/classes/watcher';

@Component({
  selector: 'cake-get-sugar',
  templateUrl: './get-sugar.component.html',
  styleUrls: ['./get-sugar.component.scss'],
})
export class GetSugarComponent extends Watcher implements OnInit, OnDestroy {
  step = 1;

  constructor(private route: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.checkDataFromRouter();
  }

  checkDataFromRouter() {
    this.step = this.route.snapshot?.firstChild?.data['step'];
    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.step = this.route.snapshot?.firstChild?.data['step'];
      }
    });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
