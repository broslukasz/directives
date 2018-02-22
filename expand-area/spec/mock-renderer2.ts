import {Renderer2} from '@angular/core';

export class MockRenderer2 implements Renderer2 {
  data;
  destroy;
  createElement;
  createComment;
  createText;
  destroyNode;
  appendChild;
  insertBefore;
  removeChild;
  parentNode;
  nextSibling;
  setAttribute;
  removeAttribute;
  addClass;
  removeClass;
  removeStyle;
  setProperty;
  setValue;
  listen;
  setStyle = (el: any, style: string, value: any, flags?: any) => {};
  selectRootElement: any = (element: string | any) => {
    return {
      nativeElement: {
        select: () => {},
        focus: () => {},
        scrollHeight: 3,
      },
    };
  }

}
