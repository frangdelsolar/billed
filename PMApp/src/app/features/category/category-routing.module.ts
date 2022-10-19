import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children:[
      {
        path: '',
        pathMatch: 'full' ,
        component: ListCategoryComponent
      },
    ]
  },
]


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ],
  exports: [
  ]
})
export class CategoryRoutingModule { }
