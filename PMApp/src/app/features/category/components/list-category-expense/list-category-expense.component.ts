import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@core/controllers/category-controller.service';
import { Category } from '@core/models/category.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-category-expense',
  templateUrl: './list-category-expense.component.html',
  styleUrls: ['./list-category-expense.component.scss']
})
export class ListCategoryExpenseComponent implements OnInit {

  categories?: Category[];

  constructor(
    private service: CategoryService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.service.getByType('expense').subscribe(
      (res)=>{
        this.categories = res;
      },
      (err)=>{
        this.messageService.add({severity:'error', summary:'Algo anda mal', detail: err.error});
      }
    )
  }

}
