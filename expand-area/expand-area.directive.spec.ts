import { ElementRef, Renderer, Input, OnInit, QueryList } from '@angular/core';
import { inject, addProviders } from '@angular/core/testing';

import { ExpandAreaDirective } from './expand-area.directive';

describe('SearchTableComponent', () => {

    beforeEach(() => [
        addProviders([
            ExpandAreaDirective,
            {
                provide: ElementRef,
                useFactory: () => {
                    return {
                        nativeElement: {
                            focus: () => {}
                        }
                    };
                }
            },
                        {
                provide: Renderer,
                useFactory: () => {
                    return {
                        invokeElementMethod: (renderEl, methodName, args) => {},
                        setElementStyle: (renderElement: any, styleName: string, styleValue: string) => {}
                    };
                }
            }
        ])
    ]);


    it('should set a proper style on Focus',
        inject([ExpandAreaDirective, ElementRef, Renderer],
        (directive: ExpandAreaDirective, el: ElementRef, renderer: Renderer) => {
            let renderElement = el.nativeElement,
                styleName = 'max-height',
                styleValue = '';

            spyOn(renderer, 'setElementStyle');
            directive.onFocus();

            expect(renderer.setElementStyle).toHaveBeenCalledWith(renderElement, styleName, styleValue);
        })
    );

    it('should set a proper style on Blur',
        inject([ExpandAreaDirective, ElementRef, Renderer],
        (directive: ExpandAreaDirective, el: ElementRef, renderer: Renderer) => {
            let renderElement = el.nativeElement,
                styleName = 'max-height',
                styleValue = '5.5rem';

            spyOn(renderer, 'setElementStyle');
            directive.onBlur();

            expect(renderer.setElementStyle).toHaveBeenCalledWith(renderElement, styleName, styleValue);
        })
    );

});
