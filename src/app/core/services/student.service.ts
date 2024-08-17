import { Injectable } from '@angular/core';
// import { Student } from '../../features/students/models/student.model';
import { SwalService } from './swal.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { HttpErrorsService } from './http-errors.service';
import { User } from '../../features/auth-module/login/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private studentsSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public students$: Observable<User[]> = this.studentsSubject.asObservable();

  private apiURL = `${environment.apiURL}/users`;

  constructor(
    private swalService: SwalService,
    private http: HttpClient,
    private httpError: HttpErrorsService) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.getAllStudents().subscribe({
      next: (students) => {
        this.studentsSubject.next(students);
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
        this.httpError.handleError(error).subscribe();
      }
    });
  }

  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL).pipe(
      map((students: User[]) => {
        return students.filter(students => students.role === 'Student');
      }),
      catchError(error => {
        console.error('Error en getAllStudents:', error);
        return this.httpError.handleError(error);
      })
    );
  }

  addStudent(student: User): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<User>(this.apiURL, student, { headers }).pipe(
      tap(() => this.refreshStudentsList()),
      catchError(error => this.httpError.handleError(error))
    ).subscribe();
  }

  editStudent(student: User): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<User>(`${this.apiURL}/${student.id}`, student, { headers }).pipe(
      tap(() => this.refreshStudentsList()),
      catchError(error => this.httpError.handleError(error))
    ).subscribe();
  }

  deleteStudent(student: User): void {
    this.swalService.delete('¿Está seguro de que desea eliminar este estudiante?')
      .then((result) => {
        if (result.isConfirmed) {
          this.http.delete(`${this.apiURL}/${student.id}`).pipe(
            tap(() => this.refreshStudentsList()),
            catchError(error => this.httpError.handleError(error))
          ).subscribe();
        } else {
          console.log('Eliminación cancelada por el usuario.');
        }
      });
  }

  getStudentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`).pipe(
      catchError(error => this.httpError.handleError(error))
    );
  }

  refreshStudentsList(): void {
    this.loadInitialData();
  }
}
