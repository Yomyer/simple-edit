import { Subject, Observable, } from 'rxjs';
import { Directive, Input, OnInit, AfterViewInit, AfterContentChecked, DoCheck, SimpleChanges, OnChanges, KeyValueDiffers } from '@angular/core';

@Directive({
  selector: '[simpleEditBlock]'
})
export class SimpleEditBlockDirective implements OnInit, AfterViewInit, OnChanges, DoCheck {

  /*
  entity: any;
  @Input('simpleEditBlock')
  set setEntity(entity: any) {
    this._editable.next(this.entity = entity);
  }
  private _entity = new Subject<any>();
  onEntityChange = this._entity.asObservable();
  */

  entity_differ: any;
  entity: any;
  @Input('simpleEditBlock')
  set setEntity(value: boolean) {
    this._entity.next(this.entity = value);
  }
  private _entity = new Subject<boolean>();
  onEntityChange = this._entity.asObservable();

  editable: boolean = false;
  @Input('simpleEditBlockEditable')
  set setEditable(value: boolean) {
    this._editable.next(this.editable = value);
  }

  private _editable = new Subject<boolean>();
  onEditableChange = this._editable.asObservable();


  constructor(
    private differs: KeyValueDiffers
  ) {
    this.entity_differ = differs.find({}).create();
  }

  ngOnInit() {

  }
  ngDoCheck() {
    var changes = this.entity_differ.diff(this.entity);
    if(changes){
      this._entity.next(this.entity);
    }
  }

  ngAfterContentChecked() {

  }

  ngAfterViewInit() {
    this._editable.next(this.editable);
    //this._entity.next(this.entity);
  }
}
