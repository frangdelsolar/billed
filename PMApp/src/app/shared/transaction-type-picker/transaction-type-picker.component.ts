import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-type-picker',
  templateUrl: './transaction-type-picker.component.html',
  styleUrls: ['./transaction-type-picker.component.scss']
})
export class TransactionTypePickerComponent implements OnInit {

  @Input() in_selection: string = "";
  @Output() out_selection = new EventEmitter<string>();

  typeSelector = new FormControl('-', [Validators.required])

  transaction_types = [
    { value:"-", viewValue: "Todos"},
    { value:"income", viewValue: "Ingreso/s"},
    { value:"expense", viewValue: "Gasto/s"},
  ]

  constructor() { }

  ngOnInit(): void {
    if (this.in_selection){
      this.typeSelector.setValue(this.in_selection);
    }
  }

  onSelect(value: string){
    this.out_selection.emit(value);
  }

}
