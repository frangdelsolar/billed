import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryService } from '@core/controllers/category-controller.service';
import { Category } from '@core/models/category.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit {

  @Input() value:number|null = null;
  @Input() transactionType: string = '';
  @Output() selection = new EventEmitter();

  categorySelect = new FormControl('', [Validators.required]);

  categories: any = [];

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    if (this.value){
      this.service.get(this.value).subscribe(res=>this.categories=[res])
    } else {
      this.service.getByType(this.transactionType).subscribe(res=>this.categories=res)
    }
  }

  onSelect(value: number){
    this.selection.emit(value);
  }

}
