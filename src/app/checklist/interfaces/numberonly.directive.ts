import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberonly]'
})
export class NumberonlyDirective {
  private regex: RegExp = new RegExp('[0-9]+("."?[0-9][0-9]?)?');
  @Input() max: number;
  @Input() min: number;
  private number: string;
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '.'];
  constructor(private el: ElementRef) {

    /*this.el.nativeElement.onkeypress = (evt) => {
      if (evt.which < 48 || evt.which > 57) {
          evt.preventDefault();
      }
  };*/
  this.el.nativeElement.onkeypress = (evt) => {
    console.log('number ', evt);
   // check whether the enteered number is between the max and min number.
   if ( this.min >= 0 && this.max > 0 ) {
    this.number = evt.target.value ? evt.target.value + evt.key : evt.key;
    if (evt.key && (parseFloat(this.number) < this.min || parseFloat(this.number) > this.max) ) {
      event.preventDefault();
    }
    if (evt.key && !String(evt.key).match(this.regex)) {
      event.preventDefault();
    }
   } else if (evt.key && !String(evt.key).match(this.regex)) {
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
