import { Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardsComponent,
    },
    {
        path: ':id',
        component: DashboardComponent,
    }
];
