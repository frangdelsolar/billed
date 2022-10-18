import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-transaction-type-picker',
  templateUrl: './transaction-type-picker.component.html',
  styleUrls: ['./transaction-type-picker.component.scss']
})
export class TransactionTypePickerComponent implements OnInit {

  @Input() in_formControl: FormControl = new FormControl('', []);
  @Output() change: EventEmitter<any> = new EventEmitter();

  transaction_types = [
    { value:"income", viewValue: "Ingreso/s"},
    { value:"expense", viewValue: "Gasto/s"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onChange(){
    this.change.emit();
  }

}
