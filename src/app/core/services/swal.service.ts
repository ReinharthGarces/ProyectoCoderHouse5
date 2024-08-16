import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService implements OnDestroy{
  constructor() {}
  private errorNotify$ = new Subject<string>();
  private successNotify$ = new Subject<string>();
  private errorNotifySubscription: Subscription | undefined;
  private successNotifySubscription: Subscription | undefined;

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
    width: '25vw',
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

  private logoutSwal = Swal.mixin({
    width: '25vw',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'notification-toast'
    },
    showClass: {
      popup: `
        animate__animated
        animate__zoomIn
        animate__faster`
    }
  });

  private ErrorSwal = Swal.mixin({
    position: 'center',
    width: '25vw',
    icon: 'error',
    confirmButtonText: 'Volver',
    confirmButtonColor: '#d33',
    customClass: {
      popup: 'notification-toast'
    },
    showClass: {
      popup: `
        animate__animated
        animate__zoomIn
        animate__faster`
    }
  });

  private SuccessSwal = Swal.mixin({
    position: 'center',
    width: '25vw',
    icon: 'success',
    confirmButtonText: 'Volver',
    confirmButtonColor: '#3085d6',
    customClass: {
      popup: 'notification-toast'
    },
    showClass: {
      popup: `
        animate__animated
        animate__zoomIn
        animate__faster`
    }
  });

//Metodos
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

  logout(message: string): Promise<any> {
    return this.logoutSwal.fire({
      title: message,
    });
  }
  
  sendErrorNotification(txt: string): void {
    if (!this.errorNotifySubscription) {
      this.errorNotifySubscription = this.errorNotify$.subscribe({
        next: (message) => {
          this.ErrorSwal.fire({
            title: message,
          });
        },
      });
    }
    this.errorNotify$.next(txt);
  }

  sendSuccessNotification(txt: string): void {
    if (!this.successNotifySubscription) {
      this.successNotifySubscription = this.successNotify$.subscribe({
        next: (message) => {
          this.SuccessSwal.fire({
            title: message,
          });
        },
      });
    }
    this.successNotify$.next(txt);
  }

  ngOnDestroy() {
    if (this.errorNotifySubscription) {
      this.errorNotifySubscription.unsubscribe();
    }

    if (this.successNotifySubscription) {
      this.successNotifySubscription.unsubscribe();
    }
  }
}
