import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './features/courses/courses.component';
import { ClassesComponent } from './features/classes/classes.component';
import { HomeComponent } from './features/home/home.component';
import { StudentsListComponent } from './features/students/students-list/students-list.component';

const routes: Routes = [
  { path: 'home', 
    component: HomeComponent
  },
  { path: 'students', 
    component: StudentsListComponent
  },
  { path: 'courses', 
    component: CoursesComponent
  },
  { path: 'classes', 
    component: ClassesComponent
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
