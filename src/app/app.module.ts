import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { MaterialModule } from './modules/material/material.module';
import { FullNamePipe } from './pipes/full-name.pipe';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { AppTitleSizeDirective } from './directives/app-title-size.directive';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ToolbarComponent,
    FullNamePipe,
    StudentListComponent,
    StudentFormComponent,
    AppTitleSizeDirective
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
