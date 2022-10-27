import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { LoginFormComponent } from '@features/auth/components/login-form/login-form.component';
import { RegisterFormComponent } from '@features/auth/components/register-form/register-form.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/home/home-routing.module').then(
      (m) => m.HomeRoutingModule
    )
  },
  {
    path: 'categorias',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/category/category-routing.module').then(
      (m) => m.CategoryRoutingModule
    )
  },
  {
    path: 'etiquetas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/tag/tag-routing.module').then(
      (m) => m.TagRoutingModule
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
