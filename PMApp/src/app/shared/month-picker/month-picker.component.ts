import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {

  dateValue = new Date();
  @Output() dateDisplay = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onValueChange(){
    this.dateDisplay.emit({
      month: this.dateValue.getMonth()+1,
      year: this.dateValue.getFullYear()
    })
  }

}
