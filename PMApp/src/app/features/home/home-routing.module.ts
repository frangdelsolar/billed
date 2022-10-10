import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path: '',
        component: SummaryComponent
      },
      {
        path: 'nueva-transaccion',
        component: AddTransactionComponent
      },
      {
        path: 'transacciones',
        component: ListTransactionComponent
      }
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
export class HomeRoutingModule { }
