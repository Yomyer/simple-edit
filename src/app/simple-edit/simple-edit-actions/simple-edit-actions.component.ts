import { Component, OnInit, ElementRef } from '@angular/core';
import { SimpleEditBlockDirective } from '../simple-edit-block.directive';

@Component({
  selector: 'simple-edit-actions',
  templateUrl: './simple-edit-actions.component.html',
  styleUrls: ['./simple-edit-actions.component.css']
})
export class SimpleEditActionsComponent implements OnInit {
  block: SimpleEditBlockDirective;

  constructor(
    public element: ElementRef
  ) { }

  ngOnInit() {

  }

  edit() {
    this.block.editEmitter();
  }
  save() {
    this.block.saveEmitter();
  }
  publish() {
    this.block.publishEmmiter();
  }

}
