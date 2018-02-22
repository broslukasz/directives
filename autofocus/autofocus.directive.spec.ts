import {AutofocusDirective} from './autofocus.directive';
import {MockElementRef} from './spec/mock-element-ref';
import {MockRenderer2} from './spec/mock-renderer2';
import {discardPeriodicTasks, fakeAsync, tick} from '@angular/core/testing';

describe('AutofocusDirective', () => {
  it('should create an instance', () => {
    const directive = new AutofocusDirective(new MockElementRef(), new MockRenderer2());
    expect(directive).toBeTruthy();
  });

  it('should set focus automotically when directive initialized', fakeAsync(() => {
    // given
    const directive = new AutofocusDirective(new MockElementRef(), new MockRenderer2());
    spyOn(directive.rootElement.nativeElement, 'focus').and.callThrough();

    // when
    directive.ngAfterViewInit();
    tick();

    // then
    expect(directive.rootElement.nativeElement.focus).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should not set focus automatically when directive disabled', fakeAsync(() => {
    // given
    const directive = new AutofocusDirective(new MockElementRef(), new MockRenderer2());
    spyOn(directive.rootElement.nativeElement, 'focus');

    // when
    directive._isEnabled = false;
    directive.ngAfterViewInit();
    tick();

    // then
    expect(directive.rootElement.nativeElement.focus).not.toHaveBeenCalled();
    discardPeriodicTasks();
  }));
});
