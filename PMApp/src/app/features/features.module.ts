import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,
    HomeModule,
    SharedModule,
  ],
  exports: [
    HomeModule,
    SharedModule
  ]
})
export class FeaturesModule { }
