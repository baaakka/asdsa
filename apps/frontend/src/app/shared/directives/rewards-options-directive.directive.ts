import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { RewardItem } from '@cake/lib-api-interface';
import { RewardsOptionsComponent } from '../components/rewards-options/rewards-options.component';

@Directive({
  selector: '[cakeRewardsOptions]',
})
export class RewardsOptionsDirective implements OnDestroy {
  @Input() cakeRewardsOptions!: RewardItem;
  private componentRef: ComponentRef<any> | null = null;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: PointerEvent) {
    event.preventDefault();

    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(
          RewardsOptionsComponent
        );
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      
      const domElement = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      document.body.appendChild(domElement);
      this.setRewardsOptionsComponentProerties();
    }
  }

  setRewardsOptionsComponentProerties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.reward = this.cakeRewardsOptions;
      const { right, bottom } =
        this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.right = right;
      this.componentRef.instance.top = bottom + 24;
    }
  }

  @HostListener('document:click', ['$event.target'])
  onCloseClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.destroy();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
