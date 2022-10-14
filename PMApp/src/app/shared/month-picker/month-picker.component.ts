import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit {

  @Input() in_selection = new Date();
  @Output() out_selection = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onValueChange(){
    this.out_selection.emit({
      month: this.in_selection.getMonth()+1,
      year: this.in_selection.getFullYear()
    })
  }

  setMonth(action: string){
    if (action=='add'){
      this.in_selection = new Date(this.in_selection.setMonth(this.in_selection.getMonth()+1));
    } else if (action=='substract') {
      this.in_selection = new Date(this.in_selection.setMonth(this.in_selection.getMonth()-1));
    }
    this.onValueChange();
  }

}
