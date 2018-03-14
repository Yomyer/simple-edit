import { SimpleEditFieldDirective } from './simple-edit-field/simple-edit-field.directive';
import { SimpleEditBlockDirective } from './simple-edit-block.directive';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SimpleEditService {

  private _current_field = new Subject<SimpleEditFieldDirective>();
  onChangeCurrentField = this._current_field.asObservable();

  private _current_block = new Subject<SimpleEditBlockDirective>();
  onChangeCurrentBlock = this._current_block.asObservable();

  constructor() { }

  setCurrentField(field: SimpleEditFieldDirective){
    this._current_field.next(field);
  }

  setCurrentBlock(block: SimpleEditBlockDirective){
    this._current_block.next(block)
  }

}
