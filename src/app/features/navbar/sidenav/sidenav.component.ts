import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../auth-module/login/models/user.model';
import { SwalService } from '../../../core/services/swal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  authUser$: Observable<User | null> = this.authService.authUser$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private swalService: SwalService) {}

  onDrawerToggle() {
    this.drawer.toggle();
  }

  onBackdropClick(drawer: any): void {
    drawer.close(); // Cierra el sidenav
  }

  logout(): void {
    const authUserSubscription = this.authUser$.subscribe(authUser => {
      if (authUser) {
        this.swalService.logout('¿Estás seguro que quieres cerrar sesión?')
          .then(result => {
            if (result.isConfirmed) {
              this.authService.logout();
              this.router.navigate(['login']);
            }
          })
          .catch(error => {
            console.error('Error al mostrar la confirmación de cierre de sesión', error);
          });
      } else {
        console.log('No hay usuario autenticado.');
      }
    });
    authUserSubscription.unsubscribe();
  }
  ngOnInit() {
    this.authUser$.subscribe();
  }
}
