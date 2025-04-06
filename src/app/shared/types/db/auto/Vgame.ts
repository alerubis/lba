import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VGame implements Table {

    id: number | undefined;
    league_year_id: number | undefined;
    type_game_id: number | undefined;
    team_home_id: number | undefined;
    team_guest_id: number | undefined;
    team_home_points: number | undefined;
    team_guest_points: number | undefined;
    date_hours_utc: Date | undefined;
    referee_1_id: number | undefined;
    referee_2_id: number | undefined;
    referee_3_id: number | undefined;
    team_home_name: string | undefined;
    team_guest_name: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.league_year_id = values.league_year_id;
            this.type_game_id = values.type_game_id;
            this.team_home_id = values.team_home_id;
            this.team_guest_id = values.team_guest_id;
            this.team_home_points = values.team_home_points;
            this.team_guest_points = values.team_guest_points;
            this.date_hours_utc = values.date_hours_utc;
            this.referee_1_id = values.referee_1_id;
            this.referee_2_id = values.referee_2_id;
            this.referee_3_id = values.referee_3_id;
            this.team_home_name = values.team_home_name;
            this.team_guest_name = values.team_guest_name;
        }
    }

    getName(): string {
        return 'v_game';
    }

    fromDbValues(values: any): VGame {
        const newVGame = new VGame();
        newVGame.id = values.id;
        newVGame.league_year_id = values.league_year_id;
        newVGame.type_game_id = values.type_game_id;
        newVGame.team_home_id = values.team_home_id;
        newVGame.team_guest_id = values.team_guest_id;
        newVGame.team_home_points = values.team_home_points;
        newVGame.team_guest_points = values.team_guest_points;
        newVGame.date_hours_utc = DbUtils.epochToDate(values.date_hours_utc);
        newVGame.referee_1_id = values.referee_1_id;
        newVGame.referee_2_id = values.referee_2_id;
        newVGame.referee_3_id = values.referee_3_id;
        newVGame.team_home_name = values.team_home_name;
        newVGame.team_guest_name = values.team_guest_name;
        return newVGame;
    }

    toDbValues(): any {
        return {
            id: this.id,
            league_year_id: this.league_year_id,
            type_game_id: this.type_game_id,
            team_home_id: this.team_home_id,
            team_guest_id: this.team_guest_id,
            team_home_points: this.team_home_points,
            team_guest_points: this.team_guest_points,
            date_hours_utc: DbUtils.dateToEpoch(this.date_hours_utc),
            referee_1_id: this.referee_1_id,
            referee_2_id: this.referee_2_id,
            referee_3_id: this.referee_3_id,
            team_home_name: this.team_home_name,
            team_guest_name: this.team_guest_name,
        }
    }

    toFormGroup(): any {
        return {
            league_year_id: new FormControl(this.league_year_id),
            type_game_id: new FormControl(this.type_game_id),
            team_home_id: new FormControl(this.team_home_id),
            team_guest_id: new FormControl(this.team_guest_id),
            team_home_points: new FormControl(this.team_home_points),
            team_guest_points: new FormControl(this.team_guest_points),
            date_hours_utc: new FormControl(this.date_hours_utc),
            referee_1_id: new FormControl(this.referee_1_id),
            referee_2_id: new FormControl(this.referee_2_id),
            referee_3_id: new FormControl(this.referee_3_id),
            team_home_name: new FormControl(this.team_home_name),
            team_guest_name: new FormControl(this.team_guest_name),
        }
    }

}
