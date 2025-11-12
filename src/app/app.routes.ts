import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guard/only-public-user-guard';
import { RegisterPage } from './pages/register-page/register-page';
import { onlyLoggedUserGuard } from './guard/only-loged-user-guard';
import { CanActivateFn } from '@angular/router';
import { RestaurantDetailsPage } from './pages/restaurant-details-page/restaurant-details-page';
import { GeneralLayout } from './layout/general-layout/general-layout';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { NewEditProductPage } from './pages/new-edit-product-page/new-edit-product-page';
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
        canActivate: [onlyPublicUserGuard],
        children: [
            {
                path: "",
                component: Home,
            },
            {
                path: "restaurant/:idRestaurant",
                component: RestaurantDetailsPage,
            }

        ]
    },
    {
        path: "admin",
        component: AdminLayout,
        canActivate: [onlyLoggedUserGuard],
        children: [
            {
                path: "newproduct",
                component: NewEditProductPage,
            },
            {
                path:"editproduct",
                component:NewEditProductPage
            }
        ]
    }
];
