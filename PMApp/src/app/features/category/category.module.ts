import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { ListCategoryIncomeComponent } from './components/list-category-income/list-category-income.component';
import { ListCategoryExpenseComponent } from './components/list-category-expense/list-category-expense.component';
import { ItemCategoryComponent } from './components/item-category/item-category.component';



@NgModule({
  declarations: [
    CategoryComponent,
    ListCategoryComponent,
    ListCategoryIncomeComponent,
    ListCategoryExpenseComponent,
    ItemCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports:[
  ]
})
export class CategoryModule { }
