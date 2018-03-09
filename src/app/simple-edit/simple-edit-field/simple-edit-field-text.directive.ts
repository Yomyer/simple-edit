import { Directive, Input, HostListener } from '@angular/core';
import { SimpleEditFieldDirective } from './simple-edit-field.directive';

@Directive({
  selector: '[simpleEditFieldText]'
})
export class SimpleEditFieldTextDirective extends SimpleEditFieldDirective {

  @Input('simpleEditFieldText') field: any;


  @HostListener('input', ['$event.target']) inputEvent(element) {
    this.setValue(element.innerHTML);
  }

  ngOnInit() {
    super.ngOnInit();
  }  

  setValue(value: any) {
    this.setFieldValue(value);
  }
  
}
