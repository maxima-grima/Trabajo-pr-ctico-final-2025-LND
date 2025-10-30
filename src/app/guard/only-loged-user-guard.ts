import { inject } from '@angular/core';
import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router';
<<<<<<< HEAD
import { AuthService } from '../SERVICE/auth-service';
=======
import { AuthService } from '../services/auth-service';
>>>>>>> f77fbf4d7b262dc19987e6946bffc4d76af16701
export const onlyLoggedUserGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(!auth.token){
    const newPath = router.parseUrl("/login");
    return new RedirectCommand(newPath, {
      skipLocationChange: true,
    });
  }
  return true;
};