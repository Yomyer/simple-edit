import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Directive, Input, OnInit, AfterViewInit, AfterContentChecked, DoCheck, SimpleChanges, OnChanges, KeyValueDiffers, HostListener, HostBinding, ComponentFactoryResolver, Renderer2, ComponentRef, ViewContainerRef } from '@angular/core';
import { SimpleEditActionsComponent } from './simple-edit-actions/simple-edit-actions.component';
import { SimpleEditBlockOptions } from './simple-edit-block.options';

@Directive({
  selector: '[simpleEditBlock]'
})
export class SimpleEditBlockDirective implements OnInit, AfterViewInit, DoCheck {

  entity_differ: any;
  entity: any;
  @Input('simpleEditBlock')
  set setEntity(value: any) {
    this._entity.next(this.entity = value);
  }
  private _entity = new Subject<any>();
  onEntityChange = this._entity.asObservable();

  editable: boolean = false;
  @Input('simpleEditBlockEditable')
  set setEditable(value: boolean) {
    this._editable.next(this.editable = value);
  }
  private _editable = new BehaviorSubject<boolean>(false);
  onEditableChange = this._editable.asObservable();

  settings: SimpleEditBlockOptions = new SimpleEditBlockOptions();
  @Input('simpleEditOptions') set setSettings(settings) {
    this.settings = Object.assign(this.settings, settings);
  };

  private _publish = new Subject<any>();
  onPublicChange = this._publish.asObservable();

  private _save = new Subject<any>();
  onSave = this._save.asObservable();

  private _edit = new Subject<any>();
  onEdit = this._edit.asObservable();

  @HostListener('document:keydown', ['$event']) keydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's' && this.editable && this.getHover()) {
      this.saveEmitter();
      event.preventDefault();
    }
  }

  private _hover = new BehaviorSubject<boolean>(false);
  onHover = this._hover.asObservable();

  @HostListener('mouseover') mouseOverEvent() {
    this.setHover(true);
  }
  @HostListener('mouseout') oouseOutEvent() {
    this.setHover(false);
  }

  @HostBinding('class.simple-edit-editing') get isEditable() {
    return this.editable;
  };

  @HostBinding('class.simple-edit-hover') get isHover() {
    return this.editable && this.getHover();
  };

  private actions: ComponentRef<SimpleEditActionsComponent>;

  constructor(
    private differs: KeyValueDiffers,
    private factory: ComponentFactoryResolver,
    private render: Renderer2,
    private viewContainer: ViewContainerRef,
  ) {
    this.entity_differ = differs.find({}).create();
  }

  ngOnInit() {
    this.onEditableChange.subscribe(editable => {
      if (editable) {
        this.addActions();
      } else {
        this.removeActions();
      }
    })
  }

  ngDoCheck() {
    var changes = this.entity_differ.diff(this.entity);
    if (changes) {
      this._entity.next(this.entity);
    }
  }

  ngAfterViewInit() {
    this._editable.next(this.editable);
  }

  getHover(): boolean {
    return this._hover.getValue();
  }
  setHover(hover: boolean) {
    this._hover.next(hover);
  }

  private addActions() {
    if (!this.actions) {
      const factoryCreate = this.factory.resolveComponentFactory(SimpleEditActionsComponent);
      this.actions = this.viewContainer.createComponent(factoryCreate);
      this.actions.instance.block = this;

      this.render.appendChild(
        this.viewContainer.element.nativeElement,
        this.actions.injector.get(SimpleEditActionsComponent).element.nativeElement
      );
    }
  }
  private removeActions() {
    if (this.actions) {
      this.actions.destroy();
      this.actions = null;
    }
  }

  saveEmitter() {
    this._save.next(this.entity);
  }

  editEmitter() {
    this._edit.next(this.entity);
  }

  publishEmmiter() {
    this._publish.next(this.entity);
  }
}
