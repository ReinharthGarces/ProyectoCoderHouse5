import { Injectable } from '@angular/core';
import { Student } from '../../features/students/models/student.model';
import { SwalService } from './swal.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private studentsSubject: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  public students$: Observable<Student[]> = this.studentsSubject.asObservable();

  private apiURL = environment.apiURL + '/students';

  constructor(private swalService: SwalService, private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.getAllStudents().subscribe(
      students => this.studentsSubject.next(students),
      error => console.error('Error al cargar los estudiantes:', error)
    );
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  addStudent(student: Student): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<Student>(this.apiURL, student, { headers }).pipe(
      tap( newStudent => {
        this.getAllStudents().subscribe(
          students => this.studentsSubject.next(students)
        );
        this.swalService.success('Estudiante agregado');
        console.log(newStudent)
      }),
      catchError(this.handleError)
    ).subscribe();
  }

  editStudent(student: Student): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<Student>(`${this.apiURL}/${student.id}`, student, { headers }).pipe(
      tap(updatedStudent => {
        this.getAllStudents().subscribe(
          students => this.studentsSubject.next(students)
        );
        this.swalService.success('Datos editados');
      }),
      catchError(this.handleError)
    ).subscribe();
  }

  deleteStudent(student: Student): void {
    this.swalService.delete('¿Está seguro de que desea eliminar este estudiante?')
      .then((result) => {
        if (result.isConfirmed) {
          this.http.delete(`${this.apiURL}/${student.id}`).pipe(
            tap(() => {
              this.getAllStudents().subscribe(
                students => this.studentsSubject.next(students)
              );
              this.swalService.success('Estudiante eliminado');
            }),
            catchError(this.handleError)
          ).subscribe();
        } else {
          console.log('Eliminación cancelada por el usuario.');
        }
      });
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocurrio un error:', error);
    return throwError('Algo malo paso; porfavor intenta de nuevo mas tarde.');
  }
}
