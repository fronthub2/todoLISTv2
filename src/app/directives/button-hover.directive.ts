import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonHover]',
})
export class ButtonHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackgroundColor('cadetblue', 'white');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor('transparent', 'white');
  }

  changeBackgroundColor(bg: string, color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', bg);
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'transition', '350ms');
  }
}
