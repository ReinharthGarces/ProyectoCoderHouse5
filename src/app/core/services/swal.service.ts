import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor() {}

  private ConfirmSwal= Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: 'confirm-toast'
    },
  });
  
  private DeleteSwal = Swal.mixin({
    position: 'center',
    width: '30vw',
    showConfirmButton: true,
    showCancelButton: true,
    icon: 'error',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'delete-toast'
    }
  });

  private notify$ = new Subject<string>();


  success(message: string): void {
    this.ConfirmSwal.fire({
      icon: "success",
      title: message
    });
  }

  delete(message: string): Promise<any> {
    return this.DeleteSwal.fire({
      title: message,
    });
  }

  sendNotification(txt: string) {
    this.notify$.next(txt);
    this.notify$.subscribe({
      next: (message) => {
        Swal.fire(message, '', 'info');
      },
    });
  }
}
