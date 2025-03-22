import { Routes } from '@angular/router';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { DashboardEditComponent } from './dashboard/dashboard-edit.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardsComponent,
    },
    {
        path: ':id',
        component: DashboardEditComponent,
    }
];
