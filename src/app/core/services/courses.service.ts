import { Injectable } from '@angular/core';
import { Course } from '../../features/courses/models/course.model';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiURL = environment.apiURL + '/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  getCourseById(id: string): Observable<Course> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Course>(url).pipe(
      catchError(this.handleError)
    );
  }

  enrollInCourse(id: string): Observable<void> {
    const url = `${this.apiURL}/${id}/enroll`;
    return this.http.post<void>(url, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}