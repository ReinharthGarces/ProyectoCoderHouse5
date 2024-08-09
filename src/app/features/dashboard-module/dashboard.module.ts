import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FullNamePipe } from '../../shared/pipes/full-name.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { ToolbarComponent } from '../navbar/toolbar/toolbar.component';
import { SidenavComponent } from '../navbar/sidenav/sidenav.component';
import { StudentsFormComponent } from '../students/students-form/students-form.component';
import { StudentsListComponent } from '../students/students-list/students-list.component';
import { ClassesComponent } from '../classes/classes.component';
import { CoursesComponent } from '../courses/courses.component';
import { DashboardComponent } from './dashboard.component';
import { FooterComponent } from '../navbar/footer/footer.component';
import { AppTitleSizeDirective } from '../../shared/directives/app-title-size.directive';


@NgModule({
  declarations: [
    FullNamePipe,
    AppTitleSizeDirective,
    ToolbarComponent,
    SidenavComponent,
    StudentsListComponent,
    StudentsFormComponent,
    ClassesComponent,
    CoursesComponent,
    HomeComponent,
    DashboardComponent,
    FooterComponent
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    FooterComponent,
    StudentsListComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
