import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ClassesComponent } from './components/classes/classes.component';

const routes: Routes = [
  // { path: 'home', 
  //   component: SidenavComponent
  // },
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
