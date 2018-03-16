import { SimpleEditSettingsComponent } from './simple-edit-settings.component';
import { SimpleEditFieldDirective } from './../simple-edit-field/simple-edit-field.directive';
import { Component, OnInit, ElementRef, Inject, InjectionToken, Renderer2 } from '@angular/core';

@Component({
  selector: 'simple-edit-settings-text',
  template: `
    settings text
    <div>{{ field.getValue() }}</div>
  `,
})
export class SimpleEditSettingsTextComponent extends SimpleEditSettingsComponent implements OnInit {

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}