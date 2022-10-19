import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home-routing.module').then(
      (m) => m.HomeRoutingModule
    )
  },
  {
    path: 'categorias',
    loadChildren: () => import('./features/category/category-routing.module').then(
      (m) => m.CategoryRoutingModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
