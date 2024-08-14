import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../auth-module/login/models/user.model';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  authUser$: Observable<User | null> = this.authService.authUser$;

  constructor(private authService: AuthService) {}

  onDrawerToggle() {
    this.drawer.toggle();
  }

  onBackdropClick(drawer: any): void {
    drawer.close(); // Cierra el sidenav
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authUser$.subscribe();
  }
}
