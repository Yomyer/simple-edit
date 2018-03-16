import { SimpleEditPanelComponent } from './simple-edit-panel/simple-edit-panel.component';
import { element } from 'protractor';
import { DatePipe } from '@angular/common';
import { SimpleEditFieldDirective } from './simple-edit-field/simple-edit-field.directive';
import { SimpleEditBlockDirective } from './simple-edit-block.directive';
import { Subject } from 'rxjs';
import { Type, Injectable, Renderer2, RendererFactory2, ComponentFactoryResolver, ComponentRef, Injector, ElementRef, OnInit, ApplicationRef } from '@angular/core';

@Injectable()
export class SimpleEditService {
  private render: Renderer2;

  public active_field = null;
  private _active_field = new Subject<SimpleEditFieldDirective>();
  onChangeActiveField = this._active_field.asObservable();

  public active_block = null;
  private _active_block = new Subject<SimpleEditBlockDirective>();
  onChangeActiveBlock = this._active_block.asObservable();

  public panel: ComponentRef<any>;
  public get panel_element(){
    return this.panel.instance.element.nativeElement;
  }

  constructor(
    public datePipe: DatePipe,
    public rendererFactory: RendererFactory2,
    private factory: ComponentFactoryResolver,
    private injector: Injector,
    private applicationRef: ApplicationRef,
  ) {
    this.render = rendererFactory.createRenderer(null, null);

    this.render.listen(document, 'mousedown', (event) => {
      if (this.active_field && !this.active_field.element.contains(event.target) && !this.panel_element.contains(event.target)) {
        this.setCurrentField(null);
      }
    })

    this.onChangeActiveField.subscribe(field => {
      if (field && field.hasPanel) {
        this.addPanel();
      } else {
        this.removePanel();
      }
    })
  }

  setCurrentField(field: SimpleEditFieldDirective) {
    this._active_field.next(this.active_field = field);
  }

  setCurrentBlock(block: SimpleEditBlockDirective) {
    this._active_block.next(this.active_block = block)
  }

  private addPanel() {
    if (!this.panel) {
      this.panel = this.factory.resolveComponentFactory(SimpleEditPanelComponent).create(this.injector);
      this.applicationRef.attachView(this.panel.hostView);

      this.panel.instance.field = this.active_field;
      this.panel.instance.element = this.panel.injector.get(ElementRef)

      this.render.appendChild(
        document.body,
        this.panel_element
      );
    }
  }
  private removePanel() {
    if (this.panel) {
      this.panel.destroy();
      this.panel = null;
    }
  }

}
