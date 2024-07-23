import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from '../../components/layout/toolbar/toolbar.component';
import { SidenavComponent } from '../../components/layout/sidenav/sidenav.component';
import { MaterialModule } from '../material/material.module';
import { StudentListComponent } from '../../components/student-list/student-list.component';
import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { FullNamePipe } from '../../pipes/full-name.pipe';
import { AppTitleSizeDirective } from '../../directives/app-title-size.directive';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    StudentListComponent,
    StudentFormComponent,
    FullNamePipe,
    AppTitleSizeDirective
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    StudentListComponent,
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
