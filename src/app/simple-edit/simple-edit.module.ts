import { SimpleEditFieldDateDirective } from './simple-edit-field/simple-edit-field-date.directive';
import { SimpleEditService } from './simple-edit.service';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SimpleEditBlockDirective } from './simple-edit-block.directive';
import { SimpleEditActionsComponent } from './simple-edit-actions/simple-edit-actions.component';
import { SimpleEditRepeaterDirective } from './simple-edit-repeater.directive';
import { SimpleEditFieldTextDirective } from './simple-edit-field/simple-edit-field-text.directive';
import { SimpleEditPanelComponent } from './simple-edit-panel/simple-edit-panel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SimpleEditBlockDirective,
    SimpleEditActionsComponent,
    SimpleEditRepeaterDirective,
    
    SimpleEditFieldTextDirective,
    SimpleEditFieldDateDirective,
    SimpleEditPanelComponent
  ],
  exports: [
    SimpleEditBlockDirective,
    SimpleEditRepeaterDirective,

    SimpleEditFieldTextDirective,
    SimpleEditFieldDateDirective
  ],
  providers: [
    SimpleEditService,
    DatePipe
  ],
  entryComponents: [
    SimpleEditActionsComponent,
    SimpleEditPanelComponent
  ]
})
export class SimpleEditModule { }
