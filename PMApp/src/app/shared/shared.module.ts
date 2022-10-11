import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { MonthpickerComponent } from './monthpicker/monthpicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionTypePickerComponent } from './transaction-type-picker/transaction-type-picker.component';
import { CategoryPickerComponent } from './category-picker/category-picker.component';
import { CurrencyFieldComponent } from './currency-field/currency-field.component';
import { PrimeNGModule } from './primeng.module';
import { MonthPickerComponent } from './month-picker/month-picker.component';


const myComp = [
  CategoryPickerComponent,
  CurrencyFieldComponent,
  ToolbarComponent,
  MonthpickerComponent,
  MonthPickerComponent,
  TransactionTypePickerComponent,
]

const myMod = [
  MaterialModule, 
  PrimeNGModule,
  ReactiveFormsModule,
  FormsModule,
]

@NgModule({
  declarations: [
    ...myComp,
  ],
  imports: [
    CommonModule,
    ...myMod    
  ],
  exports: [
    ...myComp,
    ...myMod
  ]
})
export class SharedModule { }
