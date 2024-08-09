import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [{
  path: 'home',
  canActivate: [authGuard],
  loadChildren: () => import('./features/dashboard-module/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth-module/auth.module').then(m => m.AuthModule)
  },
  { path: '**',  // Si no coinciden con ninguna ruta
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
