import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TagService } from '@core/controllers/tag-controller.service';

@Component({
  selector: 'app-tag-picker',
  templateUrl: './tag-picker.component.html',
  styleUrls: ['./tag-picker.component.scss']
})
export class TagPickerComponent implements OnInit {

  @Input() in_formControl: FormControl = new FormControl([], []);
  
  items: any[] = [];

  constructor(
    private service: TagService
  ) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (res)=>{
        this.items=res;
      }
    )
  }

  search(event: any){
    this.service.getResults(event.query).subscribe(
      (data) => {
        this.items=data;
    });
  }

}
