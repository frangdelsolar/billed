import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TagComponent } from './tag.component';
import { ListTagComponent } from './components/list-tag/list-tag.component';

const routes: Routes = [
  {
    path: '',
    component: TagComponent,
    children:[
      {
        path: '',
        pathMatch: 'full' ,
        component: ListTagComponent
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
export class TagRoutingModule { }
