import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './features/navbar/sidenav/sidenav.component';
import { CoursesComponent } from './features/courses/courses.component';
import { ClassesComponent } from './features/classes/classes.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: 'home', 
    component: HomeComponent
  },
  { path: 'students', 
    component: SidenavComponent
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
