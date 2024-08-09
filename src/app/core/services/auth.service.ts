import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../../features/auth-module/login/models/user.model';
import { Router } from '@angular/router';
import { SwalService } from './swal.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiURL = `${environment.apiURL}/users`;
  private authUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
  public authUser$: Observable<User | null> = this.authUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private swalService: SwalService,
  ) {}


  login(data: { email: string; password: string }): void {
    this.http.get<User[]>(this.apiURL, {
      params: {
        email: data.email,
        password: data.password
      }
    })
    .subscribe({
      next: (response) => {
        console.log(response)
        if (!response.length) {
          alert('Usuario o contraseña inválidos');
        } else {
          const authUser = response[0];
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.authUserSubject.next(authUser);
          this.router.navigate(['home']);
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
        this.swalService.sendNotification('Error al iniciar sesión');
      },
    });
  }

  logout() {
    localStorage.removeItem('authUser');
    this.authUserSubject.next(null);
    this.router.navigate(['login']);
  }

  private getUserFromLocalStorage(): User | null {
    const userJson = localStorage.getItem('authUser');
    return userJson ? JSON.parse(userJson) : null;
  }
}
