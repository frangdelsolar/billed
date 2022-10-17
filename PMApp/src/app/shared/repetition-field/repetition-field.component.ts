import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-repetition-field',
  templateUrl: './repetition-field.component.html',
  styleUrls: ['./repetition-field.component.scss']
})
export class RepetitionFieldComponent implements OnInit {

  @Input() in_repetitionOn: boolean = false;
  @Input() in_repetitions: number = 1;
  @Input() in_frequency: string = "months";
  @Input() in_disabled: boolean = false;

  @Output() out_selection = new EventEmitter();


  constructor() { }

  ngOnInit(): void {

  }

  onRepetitionToggle(){
    if (!this.in_repetitionOn){
      this.in_repetitions = 0;
      this.in_frequency = 'months';
    }
    this.onChange()
  }

 onChange(){
  this.out_selection.emit({
    repetitionOn: this.in_repetitionOn,
    repetitions: this.in_repetitions,
    frequency: this.in_frequency
  })
 }


}
