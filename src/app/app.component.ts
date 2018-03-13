import { Component, ViewChild } from '@angular/core';
import { SimpleEditBlockDirective } from './simple-edit/simple-edit-block.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('block', {read: SimpleEditBlockDirective}) block: SimpleEditBlockDirective

  entity = {
    title: 'xDD',
    content: 'lorem',
    date: new Date()
  };

  constructor(){

  }

  ngOnInit() {
    this.block.onSave.subscribe(entity => {
      console.log(entity)
    })
  }
}
