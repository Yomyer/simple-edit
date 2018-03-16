import { SimpleEditFieldDirective } from './../simple-edit-field/simple-edit-field.directive';
import { Component, OnInit, ElementRef, Inject, InjectionToken, Renderer2, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'simple-edit-panel',
  template: `
    <header>Panel</header>
    <main>
      <ng-container #settings></ng-container>
    </main>
  `,
  styles: [require('./simple-edit-panel.component.scss')]
})
export class SimpleEditPanelComponent implements OnInit {
  @ViewChild('settings', {
    read: ViewContainerRef
  }) settings: ViewContainerRef
  
  public field: SimpleEditFieldDirective;
  public element: ElementRef;

  public get render(): Renderer2 {
    return this.field.render;
  }

  public get factory(): ComponentFactoryResolver {
    return this.settings.injector.get(ComponentFactoryResolver);
  }

  constructor() { }

  ngOnInit() {
    this.render.addClass(document.body, 'siple-edit-panel-opened');
    this.render.setStyle(document.body, 'margin-right', '300px');
    this.addSettings();
  }

  ngOnDestroy() {
    this.render.removeClass(document.body, 'siple-edit-panel-opened');
    this.render.removeStyle(document.body, 'margin-right');
    this.render.removeChild(this.element.nativeElement.parentNode, this.element.nativeElement);
  }

  addSettings() {
    const factory = this.factory.resolveComponentFactory(this.field.settings);
    const component = this.settings.createComponent(factory);
    component.instance.field = this.field;
  }

  removeSettings() {

  }
}
