import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-type-picker',
  templateUrl: './transaction-type-picker.component.html',
  styleUrls: ['./transaction-type-picker.component.scss']
})
export class TransactionTypePickerComponent implements OnInit {

  @Input() valueSelected?: any;
  @Output() selection = new EventEmitter<string>();

  typeSelector = new FormControl('', [Validators.required])

  transaction_types = [
    { value:"income", viewValue: "Ingreso/s"},
    { value:"expense", viewValue: "Gasto/s"},
    { value:"", viewValue: "Todos"},
  ]

  constructor() { }

  ngOnInit(): void {
    if (this.valueSelected){
      this.typeSelector.setValue(this.valueSelected);
    }
  }

  onSelect(value: string){
    this.selection.emit(value);
  }

}
