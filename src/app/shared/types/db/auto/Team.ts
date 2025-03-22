import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Team implements Table {

    id: number | undefined;
    name: string | undefined;
    logo_url: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.name = values.name;
            this.logo_url = values.logo_url;
        }
    }

    getName(): string {
        return 'team';
    }

    fromDbValues(values: any): Team {
        const newTeam = new Team();
        newTeam.id = values.id;
        newTeam.name = values.name;
        newTeam.logo_url = values.logo_url;
        return newTeam;
    }

    toDbValues(): any {
        return {
            id: this.id,
            name: this.name,
            logo_url: this.logo_url,
        }
    }

    toFormGroup(): any {
        return {
            name: new FormControl(this.name),
            logo_url: new FormControl(this.logo_url),
        }
    }

}
