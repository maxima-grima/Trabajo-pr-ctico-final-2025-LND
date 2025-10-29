import { CanActivateFn } from '@angular/router';

export const onlyPublicUserGuard: CanActivateFn = (route, state) => {
  return true;
};
