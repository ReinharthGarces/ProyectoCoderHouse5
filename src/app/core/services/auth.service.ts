import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  login(data: { email: string; password: string }) {
    this.http.get(environment.apiURL + '/students', {
      params: {
        email: data.email,
        password: data.password
      }
    })
    .subscribe (res => {
      console.log(res);
    })
  }



  logout () {
  }


}
