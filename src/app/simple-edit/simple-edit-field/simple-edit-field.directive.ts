import { Subject, BehaviorSubject } from 'rxjs';
import { SimpleEditFieldOptions } from './simple-edit-field.options';
import { SimpleEditBlockDirective } from '../simple-edit-block.directive';
import { Directive, Input, OnInit, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[simpleEditField]'
})
export abstract class SimpleEditFieldDirective implements OnInit {

  @Input('simpleEditField') field: any;

  options: SimpleEditFieldOptions = new SimpleEditFieldOptions();
  @Input('simpleEditFieldOptions')
  set setEditable(value: SimpleEditFieldOptions) {
    this._options.next(this.options = value);
  }
  public _options = new Subject<SimpleEditFieldOptions>();
  onOptionsChange = this._options.asObservable();

  public value = new BehaviorSubject<any>(null);
  onValueChange = this.value.asObservable();

  public editable = new Subject<boolean>();
  onEditableChange = this.editable.asObservable();

  focus = new BehaviorSubject<boolean>(false);
  onFocus = this.focus.asObservable();

  hover = new BehaviorSubject<boolean>(false);
  onHover = this.hover.asObservable();

  constructor(
    public block: SimpleEditBlockDirective,
    public render: Renderer2,
    public el: ElementRef
  ) {

    this.onValueChange.subscribe((value: any) => {
      this.onValueChangeEvent(value);
    });

    this.block.onEntityChange.subscribe((entity: any) => {
      this.setValue(entity[this.getFieldName()]);
    });

    this.block.onEditableChange.subscribe((editable: boolean) => {
      this.editable.next(editable);
    })

    this.editable.subscribe((editable: boolean) => {
      this.onEditableChangeEvent(editable);
    });
  }

  ngOnInit() {
    this.setValue(this.getField());
  }

  getValue(): any {
    return this.value.getValue();
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

  getFocus(): boolean {
    return this.focus.getValue();
  }
  setFocus(focus: boolean) {
    this.focus.next(focus);
  }

  getHover(): boolean {
    return this.hover.getValue();
  }
  setHover(hover: boolean) {
    this.hover.next(hover);
  }

  onEditableChangeEvent(editable: boolean) {
    console.error('onEditableChangeEvent() function missing');
  }

  onValueChangeEvent(value: any) {
    console.error('onValueChangeEvent() function missing');
  }
}

