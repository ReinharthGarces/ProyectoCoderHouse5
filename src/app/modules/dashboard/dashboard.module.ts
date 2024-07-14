import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/layout/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { StudentListComponent } from '../../components/student-list/student-list.component';
import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { FullNamePipe } from '../../pipes/full-name.pipe';
import { AppTitleSizeDirective } from '../../directives/app-title-size.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    StudentListComponent,
    StudentFormComponent,
    FullNamePipe,
    AppTitleSizeDirective
  ],
  exports: [
    NavbarComponent,
    StudentListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
