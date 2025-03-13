import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Game implements Table {

    id: number | undefined;
    league_year_id: number | undefined;
    type_game_id: number | undefined;
    team_home_id: number | undefined;
    team_guest_id: number | undefined;
    date_hours_utc: Date | undefined;
    referee_1_id: number | undefined;
    referee_2_id: number | undefined;
    referee_3_id: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.league_year_id = values.league_year_id;
            this.type_game_id = values.type_game_id;
            this.team_home_id = values.team_home_id;
            this.team_guest_id = values.team_guest_id;
            this.date_hours_utc = values.date_hours_utc;
            this.referee_1_id = values.referee_1_id;
            this.referee_2_id = values.referee_2_id;
            this.referee_3_id = values.referee_3_id;
        }
    }

    getName(): string {
        return 'game';
    }

    fromDbValues(values: any): Game {
        const newGame = new Game();
        newGame.id = values.id;
        newGame.league_year_id = values.league_year_id;
        newGame.type_game_id = values.type_game_id;
        newGame.team_home_id = values.team_home_id;
        newGame.team_guest_id = values.team_guest_id;
        newGame.date_hours_utc = DbUtils.epochToDate(values.date_hours_utc);
        newGame.referee_1_id = values.referee_1_id;
        newGame.referee_2_id = values.referee_2_id;
        newGame.referee_3_id = values.referee_3_id;
        return newGame;
    }

    toDbValues(): any {
        return {
            id: this.id,
            league_year_id: this.league_year_id,
            type_game_id: this.type_game_id,
            team_home_id: this.team_home_id,
            team_guest_id: this.team_guest_id,
            date_hours_utc: DbUtils.dateToEpoch(this.date_hours_utc),
            referee_1_id: this.referee_1_id,
            referee_2_id: this.referee_2_id,
            referee_3_id: this.referee_3_id,
        }
    }

    toFormGroup(): any {
        return {
            league_year_id: new FormControl(this.league_year_id),
            type_game_id: new FormControl(this.type_game_id),
            team_home_id: new FormControl(this.team_home_id),
            team_guest_id: new FormControl(this.team_guest_id),
            date_hours_utc: new FormControl(this.date_hours_utc),
            referee_1_id: new FormControl(this.referee_1_id),
            referee_2_id: new FormControl(this.referee_2_id),
            referee_3_id: new FormControl(this.referee_3_id),
        }
    }

}
