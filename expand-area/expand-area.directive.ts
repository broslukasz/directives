import { Directive, ElementRef, Renderer, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: '[azExpandArea]'
})
export class ExpandAreaDirective implements OnInit {

    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    @HostListener('focus') onFocus() {
        this.renderer.setElementStyle(this.el.nativeElement, 'max-height', '');
    }

    @HostListener('blur') onBlur() {
        this.renderer.setElementStyle(this.el.nativeElement, 'max-height', '5.5rem');
    }

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit(): void {
        this.adjust();
    }
    adjust(): void {
        this.el.nativeElement.style.overflow = 'hidden';
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
    }
}
