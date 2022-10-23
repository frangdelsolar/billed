import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagComponent } from './tag.component';
import { ListTagComponent } from './components/list-tag/list-tag.component';



@NgModule({
  declarations: [
    TagComponent,
    ListTagComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports:[
  ]
})
export class TagModule { }
