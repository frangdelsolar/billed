import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '@features/auth/components/login-form/login-form.component';
import { RegisterFormComponent } from '@features/auth/components/register-form/register-form.component';

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
  },
  {
    path: 'iniciar-sesion',
    component: LoginFormComponent
  },
  {
    path: 'registrarse',
    component: RegisterFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
