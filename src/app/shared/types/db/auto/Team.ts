import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Team implements Table {

    id: number | undefined;
    name: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.name = values.name;
        }
    }

    getName(): string {
        return 'team';
    }

    fromDbValues(values: any): Team {
        const newTeam = new Team();
        newTeam.id = values.id;
        newTeam.name = values.name;
        return newTeam;
    }

    toDbValues(): any {
        return {
            id: this.id,
            name: this.name,
        }
    }

    toFormGroup(): any {
        return {
            name: new FormControl(this.name),
        }
    }

}
