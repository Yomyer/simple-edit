import { SimpleEditFieldDirective } from './simple-edit/simple-edit-field/simple-edit-field.directive';
import { SimpleEditService } from './simple-edit/simple-edit.service';
import { Component, ViewChild } from '@angular/core';
import { SimpleEditBlockDirective } from './simple-edit/simple-edit-block.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(SimpleEditBlockDirective) block: SimpleEditBlockDirective

  entity = {
    title: 'xDD',
    content: 'lorem',
    date: new Date()
  };

  constructor(private service: SimpleEditService){
    
  }

  ngOnInit() {
    this.block.onSave.subscribe(entity => {
      console.log(entity)
    })
    this.service.onChangeActiveBlock.subscribe(block => {
      console.log(block);
    })
    this.service.onChangeActiveField.subscribe((field: SimpleEditFieldDirective) => {
      if(field){
        console.log(field.getValue());
      }
    })
  }

  changeSettings(){
    this.block.settings.edit = !this.block.settings.edit;
  }
}
