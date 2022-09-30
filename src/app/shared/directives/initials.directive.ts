import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Intern } from './../../core/models/intern';
import { BubbleConfig } from './configs/bubble-config';

@Directive({
  selector: '[appInitials]'
})
export class InitialsDirective implements OnInit {
  @Input() public intern!: Intern | null;

  @Input() public config: any = {
    height: '2em',
    width: '2em',
    lineHeight: '2em',
    backgroundColor: 'rgba(127, 127, 127, .7)',
    borderRadius: '50%',
    fontWeight: 'bold',
    color: '#000',
    verticalAlign: 'middle',
    textAlign: 'center',
  };

  private nativeElement: HTMLElement;

  private stylesMap: Map<string, string> = new Map<string, string>();


  constructor(
    private renderer: Renderer2,
    elementRef: ElementRef
  ) {
    this.nativeElement = elementRef.nativeElement;
  }

  public ngOnInit(): void {
    // Styles from object
    const config: BubbleConfig = new BubbleConfig().deserialize(this.config);

    for (const property in this.config) {
      this.renderer.setStyle(this.nativeElement, property, this.config[property]);
    }
    // FIX : show only name initial if not firstname
    let initials: string;
    if (this.intern?.firstname !== '') {
      initials = this.intern!.firstname!.charAt(0) + this.intern!.name!.charAt(0);
    } else {
      initials = this.intern!.name!.charAt(0);
    }


    this.nativeElement.innerText = initials;
  }
}
