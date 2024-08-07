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



// import { Injectable } from '@angular/core';
// import { Student } from '../../features/students/models/student.model';
// import { SwalService } from './swal.service';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

// export class StudentsService {
//   private studentsSubject: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
//   public students$: Observable<Student[]> = this.studentsSubject.asObservable();
//   constructor(private swalService: SwalService) {
//     this.dataSource()
//   }
//   private students: Student[] = [
//     {
//       id: 1,
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com'
//     },
//     {
//       id: 2,
//       firstName: 'Jane',
//       lastName: 'Smith',
//       email: 'jane.smith@example.com'
//     },
//     {
//       id: 3,
//       firstName: 'Samuel',
//       lastName: 'Green',
//       email: 'samuel.green@example.com'
//     },
//     {
//       id: 4,
//       firstName: 'Emily',
//       lastName: 'Brown',
//       email: 'emily.brown@example.com'
//     },
//     {
//       id: 5,
//       firstName: 'Michael',
//       lastName: 'Johnson',
//       email: 'michael.johnson@example.com',
//     },
//     {
//       id: 6,
//       firstName: 'Sophia',
//       lastName: 'Williams',
//       email: 'sophia.williams@example.com'
//     }
//   ];

//   dataSource(): void {
//     this.studentsSubject.next(this.students);
//   }

//   getAllStudents(): Student[] {
//     return this.students;
//   }

//   addStudent(student: Student): void {
//     const maxId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) : 0;
//     student.id = maxId + 1;
//     this.students.push(student);
//     this.swalService.success('Estudiante agregado');
//   }

//   editStudent(student: Student): void {
//     const index = this.students.findIndex(s => s.id === student.id);
//     if (index !== -1) {
//       this.students[index] = student;
//       this.swalService.success('Datos editados');
//     }
//   }

//   deleteStudent(student: Student): void {
//     const index = this.students.findIndex(s => s.id === student.id);
//     if (index !== -1) {
//       this.swalService.delete('¿Está seguro de que desea eliminar este estudiante?')
//         .then((result) => {
//           if (result.isConfirmed) {
//             this.students.splice(index, 1);
//             this.swalService.success('Estudiante eliminado');
//             this.dataSource();
//           } else {
//             console.log('Eliminación cancelada por el usuario.');
//           }
//         });
//     } else {
//       console.log('Estudiante no encontrado.');
//     }
//   }
// }
