import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { ListTransactionComponent } from './components/list-transaction/list-transaction.component';
import { DetailTransactionComponent } from './components/detail-transaction/detail-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {
        path: '',
        pathMatch: 'full' ,
        component: SummaryComponent
      },
      {
        path: 'transacciones',
        children:[
          {
            path:"",
            component: ListTransactionComponent
          },
          {
            path: 'crear',
            component: AddTransactionComponent
          },
          {
            path: ':id',
            children:[
              {
                path: "",
                component: DetailTransactionComponent
              },
              {
                path: 'editar',
                component: AddTransactionComponent
              }
            ]
          },
        ]
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
export class HomeRoutingModule { }
