import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guard/only-public-user-guard';
import { RegisterPage } from './pages/register-page/register-page';
import { onlyLoggedUserGuard } from './guard/only-loged-user-guard';
import { CanActivateFn } from '@angular/router';
import { RestaurantDetailsPage } from './restaurant-details-page/restaurant-details-page';
import { GeneralLayout } from './layout/general-layout/general-layout';
export const routes: Routes = [

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
        path: "",
        component: GeneralLayout,
        children: [
            {
                path: "",
                component: Home,
            },
            {
                path: "restaurant/:restaurantName",
                component: RestaurantDetailsPage,
                canActivate: [onlyPublicUserGuard]
            }

        ]
    }
];
