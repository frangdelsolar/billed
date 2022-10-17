import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-frequency-picker',
  templateUrl: './frequency-picker.component.html',
  styleUrls: ['./frequency-picker.component.scss']
})
export class FrequencyPickerComponent implements OnInit {

  @Input()
  selection: string="";

  @Input() in_disabled: boolean = false;
  
  @Output()
  selectionChange = new EventEmitter<string>();

  frequencySelector = new FormControl('', [Validators.required])

  frequencies = [
    { value:"days", viewValue: "Días"},
    { value:"weeks", viewValue: "Semanas"},
    { value:"months", viewValue: "Meses"},
    { value:"years", viewValue: "Años"},
  ]

  constructor() { }

  ngOnInit(): void {

  }

  onChange(){
    this.selectionChange.emit(this.selection);
  }
}
