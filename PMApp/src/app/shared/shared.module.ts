import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from './material.module';
import { MonthpickerComponent } from './monthpicker/monthpicker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionTypePickerComponent } from './transaction-type-picker/transaction-type-picker.component';
import { CategoryPickerComponent } from './category-picker/category-picker.component';
import { CurrencyFieldComponent } from './currency-field/currency-field.component';


const myComp = [
  CategoryPickerComponent,
  CurrencyFieldComponent,
  ToolbarComponent,
  MonthpickerComponent,
  TransactionTypePickerComponent,
]

const myMod = [
  MaterialModule, 
  ReactiveFormsModule
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
