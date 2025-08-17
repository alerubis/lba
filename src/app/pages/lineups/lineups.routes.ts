import { Routes } from '@angular/router';
import { LineupComponent } from './lineup/lineup.component';
import { LineupsComponent } from './lineups/lineups.component';

export const routes: Routes = [
    {
        path: '',
        component: LineupsComponent,
    },
    {
        path: ':id',
        component: LineupComponent,
    }
];
