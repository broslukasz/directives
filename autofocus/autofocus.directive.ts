import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {CustomDirective} from './custom-directive';

@Directive({
  selector: '[lubrosAutofocus]',
})
export class AutofocusDirective extends CustomDirective implements AfterViewInit  {
  private isEnabled = true;

  @Input('isEnabled')
  set _isEnabled(value: boolean) {
    this.isEnabled = value;
    this.setFocus();
  }

  constructor(
    element: ElementRef,
    renderer: Renderer2,
  ) {
    super(element, renderer);
  }

  ngAfterViewInit() {
    this.setFocus();
  }

  private setFocus() {
    if (this.isEnabled) {
      setTimeout(() => {
        this.rootElement.nativeElement.focus();
      }, 0);
    }
  }
}
