import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from '../../components/layout/toolbar/toolbar.component';
import { SidenavComponent } from '../../components/layout/sidenav/sidenav.component';
import { MaterialModule } from '../material/material.module';
import { StudentsListComponent } from '../../components/students/students-list/students-list.component';
import { StudentsFormComponent } from '../../components/students/students-form/students-form.component';
import { FullNamePipe } from '../../shared/pipes/full-name.pipe';
import { AppTitleSizeDirective } from '../../shared/directives/app-title-size.directive';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ClassesComponent } from '../../components/classes/classes.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    StudentsListComponent,
    StudentsFormComponent,
    ClassesComponent,
    FullNamePipe,
    AppTitleSizeDirective
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    StudentsListComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
