import {ElementRef} from '@angular/core';

export class MockElementRef implements ElementRef {
  nativeElement = {
    style: {
      height: '3',
    },
  };
}
