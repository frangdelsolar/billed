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

  @Input() in_transactionType: Observable<string> = new Observable();
  @Input() in_formControl: FormControl = new FormControl('', []);

  categories: any = [];

  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.in_transactionType.subscribe(transaction_type=>{
      this.service.getByType(transaction_type).subscribe(
        (res)=>{
          this.categories = res;
        },
        (err)=>{
          console.log(err)
        }
        )
    })
  }

}
