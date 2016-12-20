import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[azArrowsNavigation]'
})
export class ArrowsNavigationDirective {

    @Input() azArrowsNavigation;

    public allTextAreas;

    public textAreaClickCount; number = 0;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    @HostListener('keydown', ['$event']) onKeyDown(event) {

        if (this.onBoundryArrowUp(event.key)) {
            this.fillAllTextAreas();
            this.focusUp();
        } else if (this.onBoundryArrowDown(event.key)) {
            this.fillAllTextAreas();
            this.focusDown();
        }
    }

    @HostListener('focus') onFocus() {
        this.textAreaClickCount = 0;
    }

    @HostListener('keyup') onKeyUp() {
        let valueLength = this.el.nativeElement.value.length;
        if ( this.textAreaClickCount === 0 ) {
            this.el.nativeElement.setSelectionRange(0, valueLength);
        }
        this.textAreaClickCount++;
    }

    @HostListener('click') onClick() {
        let cursorPos = this.el.nativeElement.selectionStart;
        this.textAreaClickCount++;
    }

    public focusUp() {
        if (this.isFirstRow()) {
            this.allTextAreas[this.allTextAreas.length - 1].el.nativeElement.focus();
        } else {
            this.allTextAreas[this.azArrowsNavigation[0] - 1].el.nativeElement.focus();
        }
    }

    public focusDown() {
        if (this.isLastRow()) {
            this.allTextAreas[0].el.nativeElement.focus();
        } else {
            this.allTextAreas[this.azArrowsNavigation[0] + 1].el.nativeElement.focus();
        }
    }

    private fillAllTextAreas() {
        if (!this.allTextAreas) {
            this.allTextAreas = this.azArrowsNavigation[1].toArray();
        };
    }

    private onBoundryArrowUp(event: string) {
        return event === 'ArrowUp' && this.el.nativeElement.selectionStart === 0;
    }

    private onBoundryArrowDown(key: string) {
        return key === 'ArrowDown' &&
               this.el.nativeElement.selectionEnd === this.el.nativeElement.value.length;
    }

    private isFirstRow() {
        return this.azArrowsNavigation[0] === 0;
    }

    private isLastRow() {
        return this.azArrowsNavigation[0] === this.allTextAreas.length - 1;
    }

}
