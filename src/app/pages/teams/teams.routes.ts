import { Routes } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { TeamsComponent } from './teams/teams.component';

export const routes: Routes = [
    {
        path: '',
        component: TeamsComponent,
    },
    {
        path: ':id',
        component: TeamComponent,
    }
];
