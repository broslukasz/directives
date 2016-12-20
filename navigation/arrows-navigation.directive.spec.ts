import { ElementRef, Renderer, Input, OnInit, QueryList } from '@angular/core';
import { inject, addProviders } from '@angular/core/testing';

import { ArrowsNavigationDirective } from './arrows-navigation.directive';

describe('SearchTableComponent', () => {

    beforeEach(() => [
        addProviders([
            ArrowsNavigationDirective,
            {
                provide: ElementRef,
                useFactory: () => {
                    return new ElementRef({
                            focus: function(){
                                this.focused = true;
                            },
                            focused: false
                        });
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

    it('should fill allTextAreas with queryList',
        inject([ArrowsNavigationDirective, ElementRef], (directive: ArrowsNavigationDirective, el: ElementRef) => {
            let allTextAreas = directive.allTextAreas;
            el.nativeElement.selectionStart = 0;
            directive.azArrowsNavigation = [0, new QueryList()];
            directive.azArrowsNavigation[1].reset([{el}, {el}]);
            directive.onKeyDown({key: 'ArrowUp'});

            expect(allTextAreas).toBe(undefined);
            expect(directive.allTextAreas).toEqual([{el}, {el}]);
        })
    );

    it('When keyup ArrowUp focusUp() should have been called',
        inject([ArrowsNavigationDirective, ElementRef], (directive: ArrowsNavigationDirective, el: ElementRef) => {
            el.nativeElement.selectionStart = 0;
            directive.azArrowsNavigation = [0, new QueryList()];
            directive.azArrowsNavigation[1].reset([{el}, {el}]);

            spyOn(directive, 'focusUp');
            directive.onKeyDown({key: 'ArrowUp'});

            expect(directive.focusUp).toHaveBeenCalled();
        })
    );

    it('When keyup ArrowDown focusDown() should have been called',
        inject([ArrowsNavigationDirective, ElementRef], (directive: ArrowsNavigationDirective, el: ElementRef) => {
            let sampleTranslation = 'A translation sample';
            el.nativeElement.value = sampleTranslation;
            el.nativeElement.selectionEnd = sampleTranslation.length;
            directive.azArrowsNavigation = [0, new QueryList()];
            directive.azArrowsNavigation[1].reset([{el}, {el}]);

            spyOn(directive, 'focusDown');
            directive.onKeyDown({key: 'ArrowDown'});

            expect(directive.focusDown).toHaveBeenCalled();
        })
    );

    it('Should focus on next element when ArrowDown pressed',
        inject([ArrowsNavigationDirective, ElementRef], (directive: ArrowsNavigationDirective, el: ElementRef) => {

            let sampleTranslation = 'A translation sample';
            let currentIndex = 0;
            let getNewElement = () => {
                return { el: new ElementRef({
                            focus: function(){
                                this.focused = true;
                            },
                            focused: false
                        })
                };
            };
            el.nativeElement.value = sampleTranslation;
            el.nativeElement.selectionEnd = sampleTranslation.length;
            directive.azArrowsNavigation = [currentIndex, new QueryList()];
            directive.azArrowsNavigation[1].reset([getNewElement(), getNewElement(), getNewElement()]);

            directive.onKeyDown({key: 'ArrowDown'});
            currentIndex++;
            directive.azArrowsNavigation[0] = currentIndex;
            directive.onKeyDown({key: 'ArrowDown'});

            expect(directive.allTextAreas[currentIndex + 1].el.nativeElement.focused).toBe(true);

        })
    );

    it('Should focus on first element when ArrowDown pressed on last item',
        inject([ArrowsNavigationDirective, ElementRef], (directive: ArrowsNavigationDirective, el: ElementRef) => {

            let sampleTranslation = 'A translation sample';
            let currentIndex = 2;
            let getNewElement = () => {
                return { el: new ElementRef({
                            focus: function(){
                                this.focused = true;
                            },
                            focused: false
                        })
                };
            };

            el.nativeElement.value = sampleTranslation;
            el.nativeElement.selectionEnd = sampleTranslation.length;
            directive.azArrowsNavigation = [currentIndex, new QueryList()];
            directive.azArrowsNavigation[1].reset([getNewElement(), getNewElement(), getNewElement()]);

            directive.onKeyDown({key: 'ArrowDown'});
            currentIndex = 0;
            directive.azArrowsNavigation[0] = currentIndex;

            expect(directive.allTextAreas[0].el.nativeElement.focused).toBe(true);

        })
    );

    it('Should focus on next element when ArrowUp pressed',
        inject([ArrowsNavigationDirective, ElementRef], (directive: ArrowsNavigationDirective, el: ElementRef) => {

            let currentIndex = 2;
            let getNewElement = () => {
                return { el: new ElementRef({
                            focus: function(){
                                this.focused = true;
                            },
                            focused: false
                        })
                };
            };

            el.nativeElement.selectionStart = 0;
            directive.azArrowsNavigation = [currentIndex, new QueryList()];
            directive.azArrowsNavigation[1].reset([getNewElement(), getNewElement(), getNewElement()]);

            directive.onKeyDown({key: 'ArrowUp'});
            currentIndex--;
            directive.azArrowsNavigation[0] = currentIndex;
            directive.onKeyDown({key: 'ArrowUp'});

            expect(directive.allTextAreas[currentIndex - 1].el.nativeElement.focused).toBe(true);

        })
    );

    it('Should focus on first element when ArrowDown pressed on last item',
        inject([ArrowsNavigationDirective, ElementRef], (directive: ArrowsNavigationDirective, el: ElementRef) => {

            let currentIndex = 0;
            let getNewElement = () => {
                return { el: new ElementRef({
                            focus: function(){
                                this.focused = true;
                            },
                            focused: false
                        })
                };
            };

            el.nativeElement.selectionStart = 0;
            directive.azArrowsNavigation = [currentIndex, new QueryList()];
            directive.azArrowsNavigation[1].reset([getNewElement(), getNewElement(), getNewElement()]);

            directive.onKeyDown({key: 'ArrowUp'});
            currentIndex = directive.allTextAreas.length - 1;
            directive.azArrowsNavigation[0] = currentIndex;

            expect(directive.allTextAreas[currentIndex].el.nativeElement.focused).toBe(true);

        })
    );
});
