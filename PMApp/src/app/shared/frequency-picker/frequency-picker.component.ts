import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-frequency-picker',
  templateUrl: './frequency-picker.component.html',
  styleUrls: ['./frequency-picker.component.scss']
})
export class FrequencyPickerComponent implements OnInit {

  @Input() valueSelected: string = "";
  @Output() selection = new EventEmitter<string>();

  frequencySelector = new FormControl('', [Validators.required])

  frequencies = [
    { value:"days", viewValue: "Días"},
    { value:"weeks", viewValue: "Semanas"},
    { value:"months", viewValue: "Meses"},
    { value:"years", viewValue: "Años"},
  ]

  constructor() { }

  ngOnInit(): void {
    if (this.valueSelected){
      this.frequencySelector.setValue(this.valueSelected);
    }
  }

  onSelect(value: string){
    this.selection.emit(value);
  }

}
