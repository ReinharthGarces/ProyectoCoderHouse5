import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';


const materialComponents = [
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatSidenavModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatTableModule
];

@NgModule({
  imports: [ materialComponents ],
  exports: [ materialComponents ]
})
export class MaterialModule { }
