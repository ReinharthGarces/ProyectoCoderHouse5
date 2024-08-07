import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class DataErrorsService {
  constructor() { }

  private handleError(error: HttpErrorResponse) {
      /*Error Http Front-end*/
  if (error.error instanceof ErrorEvent) {
    console.warn('Error de Front-end:', error.error.message);
  } else {
    /*Error Http Back-end*/
    console.warn(
      `Error de Front-end: ${error.status},` +
      `Cuerpo del error: ${error.error}`);
    }
    return catchError((error) => of (`Algo salió mal; por favor inténtalo de nuevo más tarde.${error}`));
  }

  httpErrors(): any {
    return this.handleError
  }
}
