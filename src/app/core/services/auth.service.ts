import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../../features/auth-module/login/models/user.model';
import { Router } from '@angular/router';
import { SwalService } from './swal.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { StudentsService } from './student.service';

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
    private studentService: StudentsService,
  ) {}

  private generateToken(): string {
    return Math.random().toString(36).substr(2, 20);
  }

  private getUserFromLocalStorage(): User | null {
    const userJson = localStorage.getItem('authUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  login(data: { email: string; password: string }): void {
    this.http.get<User[]>(`${this.apiURL}?email=${data.email}`)
      .subscribe({
        next: (response) => {
          if (!response.length || response[0].password !== data.password) {
            alert('Usuario o contraseña inválidos');
          } else {
            const authUser = response[0];
            localStorage.setItem('authUser', JSON.stringify(authUser));
            this.authUserSubject.next(authUser);
            this.router.navigate(['home']);
            this.startInactivityTimer(); 
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión', err);
          this.swalService.sendErrorNotification('Error al iniciar sesión');
        },
      });
  }

  logout() {
    localStorage.removeItem('authUser');
    this.authUserSubject.next(null);
    this.router.navigate(['login']);
  }

  register(userData: Omit<User, 'token'>): void {
    const newUser: User = {
      ...userData,
      token: this.generateToken(),
    };
    this.http.post<User>(this.apiURL, newUser)
      .subscribe({
        next: (response) => {
          this.swalService.success('Usuario registrado exitosamente');
          this.authUserSubject.next(response);
          localStorage.setItem('authUser', JSON.stringify(response));
          this.studentService.refreshStudentsList();
          this.router.navigate(['home']);
          this.startInactivityTimer(); 
        },
        error: (err) => {
          console.error('Error al registrar usuario', err);
          this.swalService.sendErrorNotification('Error al registrar usuario');
        },
      });
  }

  startInactivityTimer(): void {
    const inactivityTime = 60 * 60 * 1000;
    let timer: number;
  
    const resetTimer = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        this.logoutDueToInactivity();
      }, inactivityTime);
    };
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    resetTimer();
  }

  logoutDueToInactivity(): void {
    localStorage.removeItem('authUser');
    this.authUserSubject.next(null);
    this.router.navigate(['login']);
    alert('Se cerró la sesión debido a inactividad');
  }
}
