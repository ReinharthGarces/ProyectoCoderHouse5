import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorsService {
  constructor() { }
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.warn('Error del cliente:', error.error.message);
    } else {
      console.warn(
        `Error del servidor: ${error.status}, ` +
        `Mensaje: ${error.message}`);
    }
    // Devuelve un observable con un mensaje de error
    return throwError(() => new Error('Algo salió mal; por favor, inténtalo de nuevo más tarde.'));
  }
}