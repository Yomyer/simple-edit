import { DatePipe } from '@angular/common';
import { SimpleEditBlockDirective } from './../simple-edit-block.directive';
import { SimpleEditFieldTextDirective } from './simple-edit-field-text.directive';
import { Subject, BehaviorSubject } from 'rxjs';
import { Directive, Input, HostListener, HostBinding, Renderer2 } from '@angular/core';
import { SimpleEditFieldDirective } from './simple-edit-field.directive';

@Directive({
  selector: '[simpleEditFieldDate]'
})
export class SimpleEditFieldDateDirective extends SimpleEditFieldDirective {

  @Input('simpleEditFieldDate') field: any;
  private input;

  format(value) {
    return this.service.datePipe.transform(value, this.options.format);
  }

  onValueChangeEvent(value: any) {
    this.el.nativeElement.innerHTML = this.format(value);
  }

  onEditableChangeEvent(editable: boolean) {
    if (editable) {
      //this.addInput();
    } else {
      //this.removeInput();
    }
  }
  addInput() {
    this.input = this.render.createElement('input');
    this.render.insertBefore(this.parent, this.input, this.element);

    this.render.setAttribute(this.input, 'type', 'datetime-local');
  }
  removeInput() {
    if(this.input){
      this.render.removeChild(this.parent, this.input);
    }
  }
}
