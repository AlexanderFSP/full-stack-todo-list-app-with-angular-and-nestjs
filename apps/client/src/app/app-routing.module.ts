import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutePath } from './app.route-path';
import { EntranceFormLoginContextResolver } from './entrance-form/contexts/entrance-form-login-context.resolver';
import { EntranceFormSignupContextResolver } from './entrance-form/contexts/entrance-form-signup-context.resolver';
import { AuthGuard } from './guards/auth/auth.guard';
import { EntranceGuard } from './guards/entrance/entrance.guard';

const routes: Routes = [
  {
    path: AppRoutePath.LOGIN,
    loadComponent: () => import('./entrance-form/entrance-form.component').then(m => m.EntranceFormComponent),
    canActivate: [EntranceGuard],
    resolve: {
      context: EntranceFormLoginContextResolver
    }
  },
  {
    path: AppRoutePath.SIGNUP,
    loadComponent: () => import('./entrance-form/entrance-form.component').then(m => m.EntranceFormComponent),
    canActivate: [EntranceGuard],
    resolve: {
      context: EntranceFormSignupContextResolver
    }
  },
  {
    path: AppRoutePath.TASKS,
    loadComponent: () => import('./tasks/tasks.component').then(m => m.TasksComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: AppRoutePath.TASKS
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [EntranceFormLoginContextResolver, EntranceFormSignupContextResolver],
  exports: [RouterModule]
})
export class AppRoutingModule {}
