import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleEditBlockDirective } from './simple-edit-block.directive';
import { SimpleEditActionsComponent } from './simple-edit-actions/simple-edit-actions.component';
import { SimpleEditRepeaterDirective } from './simple-edit-repeater.directive';
import { SimpleEditFieldTextDirective } from './simple-edit-field/simple-edit-field-text.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SimpleEditBlockDirective,
    SimpleEditActionsComponent,
    SimpleEditRepeaterDirective,
    
    SimpleEditFieldTextDirective
  ],
  exports: [
    SimpleEditBlockDirective,
    SimpleEditRepeaterDirective,

    SimpleEditFieldTextDirective
  ]
})
export class SimpleEditModule { }
