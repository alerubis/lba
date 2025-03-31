import { Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';

export const routes: Routes = [
    {
        path: '',
        component: PlayersComponent,
    },
    {
        path: ':id',
        component: PlayerComponent,
    }
];
