import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberonly]'
})
export class NumberonlyDirective {
  private regex: RegExp = new RegExp('[0-9]+("."?[0-9][0-9]?)?');
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '.'];
  constructor(private el: ElementRef) {

    /*this.el.nativeElement.onkeypress = (evt) => {
      if (evt.which < 48 || evt.which > 57) {
          evt.preventDefault();
      }
  };*/
  this.el.nativeElement.onkeypress = (evt) => {
    console.log('number ', evt);
    // if (this.specialKeys.indexOf(evt.key) !== -1) {
    //  return;
   // }
  // const current: string = this.el.nativeElement.value;
   //  const next: string = current.concat(evt.key);
    if (evt.key && !String(evt.key).match(this.regex)) {
      event.preventDefault();
    }
  };
   }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }


}
