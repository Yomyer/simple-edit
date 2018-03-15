import { SimpleEditFieldDirective } from './../simple-edit-field/simple-edit-field.directive';
import { style } from '@angular/animations';
import { Component, OnInit, ElementRef, Inject, InjectionToken, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-simple-edit-panel',
  template: `
    <h1>Panel</h1>
    <div>{{ field.getValue() }}</div>
  `,
  styles: [`
    :host{
      position: absolute;
      right:0;
      top:0;
      bottom:0;
      width: 200px;
      background: red;
    }
  `]
})
export class SimpleEditPanelComponent<T> implements OnInit {
  public field: SimpleEditFieldDirective;
  public element: ElementRef;

  public get render(): Renderer2 {
    return this.field.render;
  }

  constructor() { }

  ngOnInit() {
    this.render.addClass(document.body, 'siple-edit-panel-opened');
    this.render.setStyle(document.body, 'margin-right', '200px');
  }

  ngOnDestroy() {
    this.render.removeClass(document.body, 'siple-edit-panel-opened');
    this.render.removeStyle(document.body, 'margin-right');
    this.render.removeChild(this.element.nativeElement.parentNode, this.element.nativeElement);
  }

  open() {
    
  }

  close() {

  }

}
