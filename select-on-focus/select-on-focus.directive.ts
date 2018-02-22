import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {CustomDirective} from './custom-directive';

@Directive({
  selector: '[lubrosSelectOnFocus]',
})
export class SelectOnFocusDirective extends CustomDirective implements OnInit {

  constructor(
    element: ElementRef,
    renderer: Renderer2,
  ) {
    super(element, renderer);
  }

  ngOnInit() {
    this.rootElement = this.renderer.selectRootElement(this.element);
  }

  @HostListener('focus') onFocus() {
    if (!this.isReadOnly()) {
      this.rootElement.nativeElement.select();
    }
  }

  private isReadOnly() {
    return this.renderer.selectRootElement(this.element).nativeElement.readOnly;
  }

}
