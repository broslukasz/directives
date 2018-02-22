import {SelectOnFocusDirective} from './select-on-focus.directive';
import {MockRenderer2} from './spec/mock-renderer2';
import {MockElementRef} from './spec/mock-element-ref';

describe('SelectOnFocusDirective', () => {
  it('should create an instance', () => {
    const directive = new SelectOnFocusDirective(new MockElementRef(), new MockRenderer2());
    expect(directive).toBeTruthy();
  });

  it('should select editable text field when focus', () => {
    // given
    const directive = new SelectOnFocusDirective(new MockElementRef(), new MockRenderer2());
    spyOn(directive.rootElement.nativeElement, 'select');

    // when
    directive.onFocus();

    // then
    expect(directive.rootElement.nativeElement.select).toHaveBeenCalled();
  });

  it('should not select readonly text field when focus', () => {
    // given
    const directive = new SelectOnFocusDirective(new MockElementRef(), new MockRenderer2());
    spyOn(directive.renderer, 'selectRootElement').and.callFake(() => {
      return {
        nativeElement: {
          readOnly: true,
          select: () => {},
        },
      };
    });

    spyOn(directive.rootElement.nativeElement, 'select');

    // when
    directive.onFocus();

    // then
    expect(directive.rootElement.nativeElement.select).not.toHaveBeenCalled();
  });
});
