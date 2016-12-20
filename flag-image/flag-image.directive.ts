import { Directive, ElementRef, Renderer, OnInit, Input } from '@angular/core';

import { FlagsBackgroundPositionsEnum } from '../../../../enums';

@Directive({
    selector: '[azFlagImage]'
})
export class FlagImageDirective implements OnInit {

    @Input() azFlagImage;

    public FlagsBackgroundPositions = FlagsBackgroundPositionsEnum;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        this.setBackgroundImage();
        this.setProperPositioning();
    }

    public setBackgroundImage() {
        this.renderer.setElementStyle(this.el.nativeElement,
                                      'background-image',
                                      `url('bundles/translationtool/imgs/lang-flag_v=0.1.69.png')`);
    }

    public setProperPositioning() {
        this.renderer.setElementStyle(this.el.nativeElement,
                                      'background-position',
                                      this.FlagsBackgroundPositions[this.azFlagImage]);
    }
}
