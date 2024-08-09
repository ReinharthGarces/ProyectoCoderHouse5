import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from '../classes/classes.component';
import { CoursesComponent } from '../courses/courses.component';
import { StudentsListComponent } from '../students/students-list/students-list.component';
import { HomeComponent } from '../home/home.component';
import { authGuard } from '../../core/guards/auth.guard';
import { professorGuard } from '../../core/guards/professor.guard';
import { RegisterComponent } from '../auth-module/register/register.component';


const routes: Routes = [
  { path: '', 
    component: HomeComponent
  },
  { path: 'students', 
    canActivate: [authGuard, professorGuard],
    component: StudentsListComponent
  },
  { path: 'courses', 
    canActivate: [authGuard],
    component: CoursesComponent,
    // children: [
    //   {
    //     path: 'new',
    //     component: newCoursesComponent
    //   }
    // ]
  },
  { path: 'classes', 
    canActivate: [authGuard],
    component: ClassesComponent
  },
  {path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }