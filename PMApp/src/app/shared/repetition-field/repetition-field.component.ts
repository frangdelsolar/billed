import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-repetition-field',
  templateUrl: './repetition-field.component.html',
  styleUrls: ['./repetition-field.component.scss']
})
export class RepetitionFieldComponent implements OnInit {

  @Input() in_repeatsFormControl: FormControl = new FormControl('', []);
  @Input() in_repetitionFormControl: FormControl = new FormControl('', []);
  @Input() in_frequencyFormControl: FormControl = new FormControl('', []);

  constructor() { }

  ngOnInit(): void {

  }

}
