import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth-module/login/login.component';
import { ProfileComponent } from './features/auth-module/profile/profile.component';
import { RegisterComponent } from './features/auth-module/register/register.component';

const routes: Routes = [{
  path: 'home',
  canActivate: [authGuard],
  loadChildren: () => import('./features/dashboard-module/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./features/auth-module/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'students/:id',
    canActivate: [authGuard],
    component: ProfileComponent,
    loadChildren: () => import('./features/auth-module/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'register',
    component: RegisterComponent,
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
