import {Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';
import {CustomDirective} from './custom-directive';

@Directive({
  selector: '[lubrosExtendableTextArea]',
})
export class ExtendableTextAreaDirective extends CustomDirective implements OnInit {
  @Input() shrinkOnBlur = true;
  private readonly heightAfterBlur = '3.5em';

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  @HostListener('focus') onFocus() {
    if (this.shrinkOnBlur) {
      this.renderer.setStyle(this.element.nativeElement, 'max-height', '');
    }
  }

  @HostListener('blur') onBlur() {
    if (this.shrinkOnBlur) {
      this.renderer.setStyle(this.element.nativeElement, 'max-height', this.heightAfterBlur);
    }
  }

  constructor(public element: ElementRef, public renderer: Renderer2) {
    super(element, renderer);
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, 'min-height', '2em');
    this.renderer.setStyle(this.element.nativeElement, 'overflow', 'hidden');
  }
  adjust(): void {
    this.renderer.setStyle(this.element.nativeElement, 'height', this.rootElement.nativeElement.scrollHeight + 'px');
  }
}
