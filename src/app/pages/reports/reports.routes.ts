import { Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
    {
        path: '',
        component: ReportsComponent,
    },
    {
        path: ':id',
        component: ReportComponent,
    }
];
