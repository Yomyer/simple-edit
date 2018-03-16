import { SimpleEditFieldDirective } from './../simple-edit-field/simple-edit-field.directive';
import { Component, OnInit, ElementRef, Inject, InjectionToken, Renderer2 } from '@angular/core';

@Component({
  selector: 'simple-edit-settings',
  template: `
    settings
  `,
  styles: [require('./simple-edit-settings.component.scss')]
})
export class SimpleEditSettingsComponent implements OnInit {

  field: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}