import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const professorGuard: CanActivateFn = (route, state) => {
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
  
  if (authUser && authUser.role === 'Professor') {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['login']);
    return false; 
  }
};