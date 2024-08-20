import { Injectable } from '@angular/core';
import { concatMap, delay, forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Enrollment, LoadStudentsAndCoursesResponse } from '../../features/auth-module/enrollments/models/enrollment';
import { Course } from '../../features/courses/models/course.model';
import { User } from '../../features/auth-module/login/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(
      this.apiURL + '/enrollments?_embed=student&_embed=product'
    );
  }

  getStudentsAndCourses(): Observable<LoadStudentsAndCoursesResponse> {
    return forkJoin({
      students: this.http.get<User[]>(environment.apiURL + '/users'),
      courses: this.http.get<Course[]>(environment.apiURL + '/courses'),
    });
  }

  // addEnrollment(payload: CreateEnrollmentPayload): Observable<Enrollment> {
  //   return this.http
  //     .post<Enrollment>(environment.apiUrl + '/sales', payload)
  //     .pipe(
  //       concatMap((enrollmentCreated) =>
  //         this.http.get<Enrollment>(
  //           environment.apiUrl +
  //             '/sales/' +
  //             enrollmentCreated.id +
  //             '?_embed=product&_embed=student'
  //         )
  //       )
  //     );
  // }
}