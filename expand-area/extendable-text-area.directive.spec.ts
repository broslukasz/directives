import {ExtendableTextAreaDirective} from './extendable-text-area.directive';
import {MockElementRef} from './spec/mock-element-ref';
import {MockRenderer2} from './spec/mock-renderer2';

describe('ExtendableTextAreaDirective', () => {
  it('should create an instance', () => {
    // given
    const directive = new ExtendableTextAreaDirective(new MockElementRef(), new MockRenderer2());

    // then
    expect(directive).toBeTruthy();
  });

  it('should set initial styles of text field after init', () => {
    // given
    const directive = new ExtendableTextAreaDirective(new MockElementRef(), new MockRenderer2());
    const expectedInitialMinHeight = '2em';
    const expectedInitialOverflow = 'hidden';
    spyOn(directive.renderer, 'setStyle');

    // when
    directive.shrinkOnBlur = true;
    directive.ngOnInit();

    // then
    expect(directive.renderer.setStyle).toHaveBeenCalledWith(directive.element.nativeElement, 'min-height', expectedInitialMinHeight);
    expect(directive.renderer.setStyle).toHaveBeenCalledWith(directive.element.nativeElement, 'overflow', expectedInitialOverflow);
  });

  it('should adjust height of text field after input', () => {
    // given
    const directive = new ExtendableTextAreaDirective(new MockElementRef(), new MockRenderer2());
    const initialScrollHeight = '2';
    spyOn(directive.renderer, 'setStyle');

    // when
    directive.shrinkOnBlur = true;
    directive.onInput(directive.renderer.selectRootElement(this.element));

    // then
    expect(directive.renderer.setStyle).toHaveBeenCalledWith(directive.element.nativeElement, 'height', initialScrollHeight);
  });
});
