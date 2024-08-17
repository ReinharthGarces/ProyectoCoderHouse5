import { Injectable } from '@angular/core';
import { Course } from '../../features/courses/models/course.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiURL = environment.apiURL + '/courses';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiURL);
  }
}