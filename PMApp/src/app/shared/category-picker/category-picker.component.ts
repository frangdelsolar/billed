import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryService } from '@core/controllers/category-controller.service';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit {

  @Input() in_categoryId: number|null = null;
  @Input() in_transactionType: string = '';
  @Output() out_selection = new EventEmitter();

  categorySelect = new FormControl('', [Validators.required]);
  valueSelected: any=null;

  categories: any = [];

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    if (this.in_categoryId){
      this.service.get(this.in_categoryId).subscribe(res=>{
        this.categories=[res];
        this.valueSelected = this.in_categoryId;
        this.onSelect();
      })
    } else {
      this.service.getByType(this.in_transactionType).subscribe(res=>{
        this.categories = res;
        this.valueSelected = res[0]['id'];
        this.onSelect();
      })
    }
  }

  onSelect(){
    this.out_selection.emit(this.valueSelected);
  }

}
