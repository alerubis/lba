import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PagesComponent } from './pages.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () => import('./home/home.routes').then(m => m.routes),
            },
            {
                path: 'dashboards',
                loadChildren: () => import('./dashboards/dashboards.routes').then(m => m.routes),
            },
            {
                path: 'games',
                loadChildren: () => import('./games/games.routes').then(m => m.routes),
            },
            {
                path: 'players',
                loadChildren: () => import('./players/players.routes').then(m => m.routes),
            },
            {
                path: 'teams',
                loadChildren: () => import('./teams/teams.routes').then(m => m.routes),
            },
            {
                path: 'lineups',
                loadChildren: () => import('./lineups/lineups.routes').then(m => m.routes),
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/reports.routes').then(m => m.routes),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: '**',
                loadChildren: () => import('./404/404.routes').then(m => m.routes),
            }
        ]
    }
];
