import { Subject, BehaviorSubject } from 'rxjs';
import { Directive, Input, HostListener, HostBinding } from '@angular/core';
import { SimpleEditFieldDirective } from './simple-edit-field.directive';

@Directive({
  selector: '[simpleEditFieldText]'
})
export class SimpleEditFieldTextDirective extends SimpleEditFieldDirective {

  @Input('simpleEditFieldText') field: any;

  @HostBinding('class.focus') get isFocus(): boolean {
    return this.getFocus();
  }

  @HostListener('input', ['$event.target']) inputEvent(element) {
    this.setValue(element.innerHTML);
  }

  @HostListener('focus', ['$event']) focusEvent(event: Event) {
    event.preventDefault();
    this.setFocus(true);
  }

  @HostListener('blur') blurEvent() {
    event.preventDefault();
    this.setFocus(false);
  }

  @HostListener('paste', ['$event']) keyEvent(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');

    document.execCommand('insertHTML', false, text);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  setValue(value: any) {
    if (!this.getFocus()) {
      super.setValue(value);
    }
    super.setFieldValue(value);
  }

  onEditableChangeEvent(editable: boolean) {
    this.render.setAttribute(this.el.nativeElement, 'contentEditable', editable ? 'true' : 'false');
  }

  onValueChangeEvent(value: any) {
    this.el.nativeElement.innerHTML = value;
  }
}
