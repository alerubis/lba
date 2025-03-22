import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './games/games.component';

export const routes: Routes = [
    {
        path: '',
        component: GamesComponent,
    },
    {
        path: ':id',
        component: GameComponent,
    }
];
