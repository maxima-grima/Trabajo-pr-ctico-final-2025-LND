import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard} from './guard/only-public-user-guard'; 
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [
    {
        path: "home",
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
];
