import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  onDrawerToggle() {
    this.drawer.toggle();
  }
}
