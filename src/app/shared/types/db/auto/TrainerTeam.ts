import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class TrainerTeam implements Table {

    trainer_id: number | undefined;
    team_id: number | undefined;
    date_start_utc: Date | undefined;
    date_end_utc: Date | undefined;

    constructor(values?: any) {
        if (values) {
            this.trainer_id = values.trainer_id;
            this.team_id = values.team_id;
            this.date_start_utc = values.date_start_utc;
            this.date_end_utc = values.date_end_utc;
        }
    }

    getName(): string {
        return 'trainer_team';
    }

    fromDbValues(values: any): TrainerTeam {
        const newTrainerTeam = new TrainerTeam();
        newTrainerTeam.trainer_id = values.trainer_id;
        newTrainerTeam.team_id = values.team_id;
        newTrainerTeam.date_start_utc = DbUtils.epochToDate(values.date_start_utc);
        newTrainerTeam.date_end_utc = DbUtils.epochToDate(values.date_end_utc);
        return newTrainerTeam;
    }

    toDbValues(): any {
        return {
            trainer_id: this.trainer_id,
            team_id: this.team_id,
            date_start_utc: DbUtils.dateToEpoch(this.date_start_utc),
            date_end_utc: DbUtils.dateToEpoch(this.date_end_utc),
        }
    }

    toFormGroup(): any {
        return {
            trainer_id: new FormControl(this.trainer_id),
            team_id: new FormControl(this.team_id),
            date_start_utc: new FormControl(this.date_start_utc),
            date_end_utc: new FormControl(this.date_end_utc),
        }
    }

}
