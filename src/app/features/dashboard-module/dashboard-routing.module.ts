import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from '../classes/classes.component';
import { CoursesComponent } from '../courses/courses.component';
import { StudentsListComponent } from '../students/students-list/students-list.component';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  { path: '', 
    component: HomeComponent
  },
  { path: 'students', 
    // canActivate: [AuthGuard],
    component: StudentsListComponent
  },
  { path: 'courses', 
    component: CoursesComponent,
    // children: [
    //   {
    //     path: 'new',
    //     component: newCoursesComponent
    //   }
    // ]
  },
  { path: 'classes', 
    component: ClassesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }