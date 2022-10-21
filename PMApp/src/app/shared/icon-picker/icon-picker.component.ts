import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {icons as icon_list } from './icons';
@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {

  icon_list = icon_list;

  @Input() iconFormControl: FormControl = new FormControl('pi-image', []);
  
  constructor() { }

  ngOnInit(): void {
  }

  onIconClick(value: string, panel: any){
    this.iconFormControl.setValue(value);
    panel.hide();
  }
}
