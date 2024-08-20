import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authFeature } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { EnrollmentsEffects } from './enrollments/store/enrollments.effects';
import { enrollmentsFeature } from './enrollments/store/enrollments.reducer';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EnrollmentsComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(authFeature),
    StoreModule.forFeature(enrollmentsFeature),
    EffectsModule.forFeature([AuthEffects, EnrollmentsEffects]),
  ]
})
export class AuthModule { }
