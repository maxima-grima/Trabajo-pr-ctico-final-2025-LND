import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guard/only-public-user-guard';
import { RegisterPage } from './pages/register-page/register-page';
import { onlyLoggedUserGuard } from './guard/only-loged-user-guard';
import { CanActivateFn } from '@angular/router';
import { RestaurantDetailsPage } from './restaurant-details-page/restaurant-details-page';
export const routes: Routes = [
    {
        path: "",
        component: Home,
    },
    {
        path: "login",
        component: LoginPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "restaurant/:id",
        component: RestaurantDetailsPage,
        canActivate: [onlyPublicUserGuard]
    }

];
