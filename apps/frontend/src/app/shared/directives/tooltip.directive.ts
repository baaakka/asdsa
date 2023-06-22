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
} from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Directive({
  selector: '[cakeTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() cakeTooltip = '';
  private componentRef: ComponentRef<any> | null = null;
  constructor(
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
        this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElement = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      document.body.appendChild(domElement);
      this.setTooltipComponentProperties();
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.cakeTooltip;
      const { left, right, top } =
        this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = top - 255 / 2 - 5;
      
      

      this.componentRef.instance.destroyed$.subscribe({
        next: (data: boolean) => {
          if (!data) {
            this.destroy();
          }
        },
      });
    }
  }

  @HostListener('document:click', ['$event.target'])
  onCloseClick(target:  HTMLElement): void {
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
