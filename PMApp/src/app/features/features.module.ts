import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from './category/category.module';
import { LoginFormComponent } from './auth/components/login-form/login-form.component';
import { RegisterFormComponent } from './auth/components/register-form/register-form.component';
import { RouterModule } from '@angular/router';
import { TagModule } from './tag/tag.module';


const myModules = [
  HomeModule,
  CategoryModule,
  TagModule,
  RouterModule,
  SharedModule,
]

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
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
