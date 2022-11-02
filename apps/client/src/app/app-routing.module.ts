import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutePath } from './app.route-path';

const routes: Routes = [
  {
    path: AppRoutePath.LOGIN,
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: AppRoutePath.SIGNUP,
    loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: AppRoutePath.TASKS,
    loadComponent: () => import('./tasks/tasks.component').then(m => m.TasksComponent)
  },
  {
    path: '**',
    redirectTo: AppRoutePath.TASKS
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
