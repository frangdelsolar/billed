import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-frequency-picker',
  templateUrl: './frequency-picker.component.html',
  styleUrls: ['./frequency-picker.component.scss']
})
export class FrequencyPickerComponent implements OnInit {

  @Input() in_formControl: FormControl = new FormControl('', []);


  frequencies = [
    { value:"days", viewValue: "Días"},
    { value:"weeks", viewValue: "Semanas"},
    { value:"months", viewValue: "Meses"},
    { value:"years", viewValue: "Años"},
  ]

  constructor() { }

  ngOnInit(): void {

  }


}
