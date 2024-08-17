import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../../features/classes/models/class.model';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private apiURL = environment.apiURL + '/classes';

  constructor(private http: HttpClient) { }

  getAllClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiURL);
  }
}