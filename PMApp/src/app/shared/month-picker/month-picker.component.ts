import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {

  @Input() dateValue = new Date();
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

  setMonth(action: string){
    if (action=='add'){
      this.dateValue = new Date(this.dateValue.setMonth(this.dateValue.getMonth()+1));
    } else if (action=='substract') {
      this.dateValue = new Date(this.dateValue.setMonth(this.dateValue.getMonth()-1));
    }
    this.onValueChange();
  }

}
