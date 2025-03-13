import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class TypeLeagueTypeGame implements Table {

    type_league_id: number | undefined;
    type_game_id: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.type_league_id = values.type_league_id;
            this.type_game_id = values.type_game_id;
        }
    }

    getName(): string {
        return 'type_league_type_game';
    }

    fromDbValues(values: any): TypeLeagueTypeGame {
        const newTypeLeagueTypeGame = new TypeLeagueTypeGame();
        newTypeLeagueTypeGame.type_league_id = values.type_league_id;
        newTypeLeagueTypeGame.type_game_id = values.type_game_id;
        return newTypeLeagueTypeGame;
    }

    toDbValues(): any {
        return {
            type_league_id: this.type_league_id,
            type_game_id: this.type_game_id,
        }
    }

    toFormGroup(): any {
        return {
            type_league_id: new FormControl(this.type_league_id),
            type_game_id: new FormControl(this.type_game_id),
        }
    }

}
