import { Injectable } from '@angular/core';
import { catchError, concatMap, delay, forkJoin, map, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CreateEnrollmentPayload, Enrollment, LoadStudentsAndCoursesResponse } from '../../features/auth-module/enrollments/models/enrollment';
import { Course } from '../../features/courses/models/course.model';
import { User } from '../../features/auth-module/login/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.apiURL}/enrollments?_embed=user&_embed=course`).pipe(
      catchError((error) => {
        console.error('Error fetching enrollments:', error);
        return throwError(() => new Error('Failed to fetch enrollments.'));
      })
    );
  }

  getStudentsAndCourses(): Observable<LoadStudentsAndCoursesResponse> {
    return forkJoin({
      students: this.http.get<User[]>(`${this.apiURL}/users`).pipe(
        catchError((error) => {
          console.error('Error fetching students:', error);
          return of([]);
        })
      ),
      courses: this.http.get<Course[]>(`${this.apiURL}/courses`).pipe(
        catchError((error) => {
          console.error('Error fetching courses:', error);
          return of([]); 
        })
      )
    }).pipe(
      catchError((error) => {
        console.error('Error in forkJoin:', error);
        return throwError(() => new Error('Failed to fetch students and courses.'));
      })
    );
  }
  
  addEnrollment(payload: CreateEnrollmentPayload): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.apiURL}/enrollments`, payload).pipe(
      concatMap((enrollmentCreated) => 
        this.http.get<Enrollment>(`${this.apiURL}/enrollments/${enrollmentCreated.id}?_embed=user&_embed=course`)
      ),
      catchError((error) => {
        console.error('Error adding enrollment:', error);
        return throwError(() => new Error('Failed to add enrollment.'));
      })
    );
  }
}
