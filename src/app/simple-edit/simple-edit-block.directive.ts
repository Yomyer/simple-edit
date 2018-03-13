import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Directive, Input, OnInit, AfterViewInit, AfterContentChecked, DoCheck, SimpleChanges, OnChanges, KeyValueDiffers, HostListener, HostBinding, ComponentFactoryResolver, Renderer2, ComponentRef, ViewContainerRef } from '@angular/core';
import { SimpleEditActionsComponent } from './simple-edit-actions/simple-edit-actions.component';
import { EIDRM } from 'constants';

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

  @Input('simpleEditSettings') settings = false;

  @Input('simpleEditPublic') public = false;
  private _public = new Subject<boolean>();
  onPublicChange = this._public.asObservable();

  @Input('simpleEditSave') save = false;
  private _save = new Subject<boolean>();
  onSave = this._save.asObservable();

  @Input('simpleEditSaveKeyPress') saveOnKeyPress = [];
  @HostListener('document:keypress', ['$event']) keypress(event: KeyboardEvent){
    if(this.editable && this.getHover()){
      this.saveEmitter();
    }
  }

  @Input('simpleEditEdit') edit = false;
  private _edit = new Subject<boolean>();
  onEdit = this._edit.asObservable();

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
    this._public.next(this.entity);
  }
}
