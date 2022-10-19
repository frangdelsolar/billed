import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from './category/category.module';


const myModules = [
  HomeModule,
  CategoryModule,
  SharedModule,
]

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ...myModules
  ],
  exports: [
    ...myModules
  ]
})
export class FeaturesModule { }
