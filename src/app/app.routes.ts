import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NoAuthGuard } from './auth/guards/no-auth.guard';

export const routes: Routes = [
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages.routes').then(m => m.routes),
        canActivate: [AuthGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.routes),
        canActivate: [NoAuthGuard]
    },
    {
        path: '',
        redirectTo: 'pages/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'pages/home'
    }
];
