import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CategoryService } from '@core/controllers/category-controller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit {

  @Input() in_categoryId: Observable<number> = new Observable();
  @Input() in_transactionType: Observable<string> = new Observable();
  @Output() out_selection = new EventEmitter();

  categorySelect = new FormControl('', [Validators.required]);
  valueSelected: any=null;

  categories: any = [];

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.in_transactionType.subscribe(transaction_type=>{
      this.service.getByType(transaction_type).subscribe(
        
        (res)=>{
          this.categories = res;
          this.in_categoryId.subscribe(category_id=>{
            if (category_id){
              this.valueSelected = category_id;
            } else {
              this.valueSelected = res[0]['id'];
            }
            this.onSelect();
          })
        },
        (err)=>{
          console.log(err)
        }
        
        )
    })

  }

  onSelect(){
    this.out_selection.emit(this.valueSelected);
  }

}
