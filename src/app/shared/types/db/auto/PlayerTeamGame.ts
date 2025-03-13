import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class PlayerTeamGame implements Table {

    player_id: number | undefined;
    team_id: number | undefined;
    game_id: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.player_id = values.player_id;
            this.team_id = values.team_id;
            this.game_id = values.game_id;
        }
    }

    getName(): string {
        return 'player_team_game';
    }

    fromDbValues(values: any): PlayerTeamGame {
        const newPlayerTeamGame = new PlayerTeamGame();
        newPlayerTeamGame.player_id = values.player_id;
        newPlayerTeamGame.team_id = values.team_id;
        newPlayerTeamGame.game_id = values.game_id;
        return newPlayerTeamGame;
    }

    toDbValues(): any {
        return {
            player_id: this.player_id,
            team_id: this.team_id,
            game_id: this.game_id,
        }
    }

    toFormGroup(): any {
        return {
            player_id: new FormControl(this.player_id),
            team_id: new FormControl(this.team_id),
            game_id: new FormControl(this.game_id),
        }
    }

}
