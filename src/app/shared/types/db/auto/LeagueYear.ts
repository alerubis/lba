import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class LeagueYear implements Table {

    id: number | undefined;
    league_id: number | undefined;
    date_start_utc: Date | undefined;
    date_end_utc: Date | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.league_id = values.league_id;
            this.date_start_utc = values.date_start_utc;
            this.date_end_utc = values.date_end_utc;
        }
    }

    getName(): string {
        return 'league_year';
    }

    fromDbValues(values: any): LeagueYear {
        const newLeagueYear = new LeagueYear();
        newLeagueYear.id = values.id;
        newLeagueYear.league_id = values.league_id;
        newLeagueYear.date_start_utc = DbUtils.epochToDate(values.date_start_utc);
        newLeagueYear.date_end_utc = DbUtils.epochToDate(values.date_end_utc);
        return newLeagueYear;
    }

    toDbValues(): any {
        return {
            id: this.id,
            league_id: this.league_id,
            date_start_utc: DbUtils.dateToEpoch(this.date_start_utc),
            date_end_utc: DbUtils.dateToEpoch(this.date_end_utc),
        }
    }

    toFormGroup(): any {
        return {
            league_id: new FormControl(this.league_id),
            date_start_utc: new FormControl(this.date_start_utc),
            date_end_utc: new FormControl(this.date_end_utc),
        }
    }

}
