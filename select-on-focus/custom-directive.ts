import {ElementRef, Renderer2} from '@angular/core';

export class CustomDirective {
  rootElement: ElementRef;

  constructor(public element: ElementRef, public renderer: Renderer2) {
    this.assignRenderer();
  }

  assignRenderer() {
    this.rootElement = this.renderer.selectRootElement(this.element);
  }
}
