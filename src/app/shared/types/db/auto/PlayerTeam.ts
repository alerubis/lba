import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class PlayerTeam implements Table {

    player_id: number | undefined;
    team_id: number | undefined;
    number: number | undefined;
    date_start_utc: Date | undefined;
    date_end_utc: Date | undefined;

    constructor(values?: any) {
        if (values) {
            this.player_id = values.player_id;
            this.team_id = values.team_id;
            this.number = values.number;
            this.date_start_utc = values.date_start_utc;
            this.date_end_utc = values.date_end_utc;
        }
    }

    getName(): string {
        return 'player_team';
    }

    fromDbValues(values: any): PlayerTeam {
        const newPlayerTeam = new PlayerTeam();
        newPlayerTeam.player_id = values.player_id;
        newPlayerTeam.team_id = values.team_id;
        newPlayerTeam.number = values.number;
        newPlayerTeam.date_start_utc = DbUtils.epochToDate(values.date_start_utc);
        newPlayerTeam.date_end_utc = DbUtils.epochToDate(values.date_end_utc);
        return newPlayerTeam;
    }

    toDbValues(): any {
        return {
            player_id: this.player_id,
            team_id: this.team_id,
            number: this.number,
            date_start_utc: DbUtils.dateToEpoch(this.date_start_utc),
            date_end_utc: DbUtils.dateToEpoch(this.date_end_utc),
        }
    }

    toFormGroup(): any {
        return {
            player_id: new FormControl(this.player_id),
            team_id: new FormControl(this.team_id),
            number: new FormControl(this.number),
            date_start_utc: new FormControl(this.date_start_utc),
            date_end_utc: new FormControl(this.date_end_utc),
        }
    }

}
