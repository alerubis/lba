import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Team implements Table {

    team_id: number | undefined;
    name: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.team_id = values.team_id;
            this.name = values.name;
        }
    }

    getName(): string {
        return 'team';
    }

    fromDbValues(values: any): Team {
        const newTeam = new Team();
        newTeam.team_id = values.team_id;
        newTeam.name = values.name;
        return newTeam;
    }

    toDbValues(): any {
        return {
            team_id: this.team_id,
            name: this.name,
        }
    }

    toFormGroup(): any {
        return {
            team_id: new FormControl(this.team_id),
            name: new FormControl(this.name),
        }
    }

}
