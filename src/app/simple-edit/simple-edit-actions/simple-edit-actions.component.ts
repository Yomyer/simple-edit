import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { SimpleEditBlockDirective } from '../simple-edit-block.directive';

@Component({
  selector: 'simple-edit-actions',
  template: `
    <button class="simple-edit-save" (click)="save()" *ngIf="block.settings.save">
      <i class="material-icons">save</i>
    </button>
    <button class="simple-edit-publish" (click)="publish()" *ngIf="block.settings.publish">
      <i class="material-icons">block</i>
      <i class="material-icons">publish</i>
    </button>
    <button class="simple-edit-edit" (click)="edit()" *ngIf="block.settings.edit">
      <i class="material-icons">create</i>
    </button>
  `,
  styles: [`
    @import "https://fonts.googleapis.com/icon?family=Material+Icons"
  `]
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
