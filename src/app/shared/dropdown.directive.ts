import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true,
})
export class DropdownDirective {
  @HostBinding('class.open') condition: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.condition = this.elementRef.nativeElement.contains(event.target)
      ? !this.condition
      : false;
    // if (this.condition) {
    //   this.renderer.addClass(this.elementRef.nativeElement, 'open');
    // } else {
    //   this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    // }
  }
}
