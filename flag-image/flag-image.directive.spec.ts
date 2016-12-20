import { ElementRef, Renderer } from '@angular/core';
import { inject, addProviders } from '@angular/core/testing';

import { FlagImageDirective } from './flag-image.directive';
import { FlagsBackgroundPositionsEnum } from '../../../../enums';

describe('SearchTableComponent', () => {

    beforeEach(() => [
        addProviders([
            FlagImageDirective,
            {
                provide: ElementRef,
                useFactory: () => {
                    return new ElementRef({});
                }
            },
            {
                provide: Renderer,
                useFactory: () => {
                    return {
                        setElementStyle: (el: HTMLElement, styleName: string, styleValue: string ) => { }
                    };
                }
            }
        ])
    ]);

    it('should call setBackgroundImage() after initialization',
        inject([FlagImageDirective, Renderer, ElementRef],
            (directive: FlagImageDirective, renderer: Renderer, el: ElementRef) => {

            spyOn(directive, 'setBackgroundImage');
            directive.ngOnInit();

            expect(directive.setBackgroundImage).toHaveBeenCalled();
        })
    );

    it('should call setBackgroundImage() after initialization',
        inject([FlagImageDirective, Renderer],
            (directive: FlagImageDirective, renderer: Renderer) => {

            spyOn(directive, 'setBackgroundImage');
            directive.ngOnInit();

            expect(directive.setBackgroundImage).toHaveBeenCalled();
        })
    );

    it('should set background-image with the proper arguments',
        inject([FlagImageDirective, Renderer],
            (directive: FlagImageDirective, renderer: Renderer) => {
            let HTMLElement = new ElementRef({}).nativeElement,
                styleName = 'background-image',
                styleValue = `url('bundles/translationtool/imgs/lang-flag_v=0.1.69.png')`;

            spyOn(renderer, 'setElementStyle');
            directive.setBackgroundImage();

            expect(renderer.setElementStyle).toHaveBeenCalledWith(HTMLElement, styleName, styleValue);
        })
    );

    it('should set background-position with the proper arguments',
        inject([FlagImageDirective, Renderer],
            (directive: FlagImageDirective, renderer: Renderer) => {
            let HTMLElement = new ElementRef({}).nativeElement,
                styleName = 'background-position',
                langCode = 'pol-PL',
                styleValue = '-108px -54px';

            directive.azFlagImage = langCode;

            spyOn(renderer, 'setElementStyle');
            directive.setProperPositioning();

            expect(renderer.setElementStyle).toHaveBeenCalledWith(HTMLElement, styleName, styleValue);
        })
    );

});
