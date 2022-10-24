import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SummaryComponent } from './components/summary/summary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';

import { HomeComponent } from './home.component';
import { ItemTransactionComponent } from './components/item-transaction/item-transaction.component';
import { DetailTransactionComponent } from './components/detail-transaction/detail-transaction.component';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';
import { UploadTransactionComponent } from './components/upload-transaction/upload-transaction.component';


const myComponents = [
  HomeComponent,
  SummaryComponent,
  AddTransactionComponent,
  EditTransactionComponent,
  ListTransactionComponent,
  ItemTransactionComponent,
  DetailTransactionComponent,
  UploadTransactionComponent
]

@NgModule({
  declarations: [
    ...myComponents
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
  ]
})
export class HomeModule { }
