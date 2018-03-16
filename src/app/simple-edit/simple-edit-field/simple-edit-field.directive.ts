import { SimpleEditPanelComponent } from './../simple-edit-panel/simple-edit-panel.component';
import { SimpleEditService } from './../simple-edit.service';
import { Subscription } from 'rxjs/Rx';
import { Subject, BehaviorSubject } from 'rxjs';
import { SimpleEditFieldOptions } from './simple-edit-field.options';
import { SimpleEditBlockDirective } from '../simple-edit-block.directive';
import { Directive, Input, OnInit, Renderer2, ElementRef, HostBinding, OnDestroy, Type } from '@angular/core';

@Directive({
  selector: '[simpleEditField]'
})
export class SimpleEditFieldDirective implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];

  @Input('simpleEditField') field: any;

  options: SimpleEditFieldOptions = new SimpleEditFieldOptions();
  @Input('simpleEditOptions')
  set setEditable(value: SimpleEditFieldOptions) {
    this._options.next(this.options = value);
  }
  private _options = new Subject<SimpleEditFieldOptions>();
  onOptionsChange = this._options.asObservable();

  public value = new BehaviorSubject<any>(null);
  onValueChange = this.value.asObservable();

  private editable = new Subject<boolean>();
  onEditableChange = this.editable.asObservable();

  private _focus = new BehaviorSubject<boolean>(false);
  onFocus = this._focus.asObservable();

  public settings: Type<any> = null;
  get hasPanel() {
    return this.settings ? true : false;
  }

  parent = this.el.nativeElement.parentNode;
  element = this.el.nativeElement;

  constructor(
    public block: SimpleEditBlockDirective,
    public render: Renderer2,
    public el: ElementRef,
    public service: SimpleEditService
  ) {

    this.subscriptions.push(this.onValueChange.subscribe((value: any) => {
      this.onValueChangeEvent(value);
    }));

    this.subscriptions.push(this.block.onEntityChange.subscribe((entity: any) => {
      if (this.getFieldName()) {
        this.setValue(entity[this.getFieldName()]);
      }
    }));

    this.subscriptions.push(this.block.onEditableChange.subscribe((editable: boolean) => {
      this.editable.next(editable);
    }));

    this.subscriptions.push(this.editable.subscribe((editable: boolean) => {
      this.onEditableChangeEvent(editable);
    }));

    this.subscriptions.push(this.onFocus.subscribe(focus => {
      if (focus) {
        this.service.setCurrentField(this);
        this.service.setCurrentBlock(this.block);
      }
    }));
  }

  ngOnInit() {
    this.setValue(this.getField());
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  getValue(): any {
    return this.format(this.value.getValue());
  }

  setValue(value: any) {
    if (value != this.getValue()) {
      this.value.next(value);
      this.setFieldValue(value);
    }
  }

  setFieldValue(value: any) {
    this.block.entity[this.getFieldName()] = value;
  }

  getField(): any {
    return this.block.entity[this.getFieldName()];
  }

  getFieldName() {
    return this.field;
  }

  getSelectorName() {
    return this.constructor.name.replace('SimpleEdit', 'simpleEdit').replace('Directive', '');
  }

  format(value) {
    return value;
  }

  getFocus(): boolean {
    return this._focus.getValue();
  }
  setFocus(focus: boolean) {
    this._focus.next(focus);
  }

  onEditableChangeEvent(editable: boolean) {
    console.error('onEditableChangeEvent() function missing');
  }

  onValueChangeEvent(value: any) {
    console.error('onValueChangeEvent() function missing');
  }
}

