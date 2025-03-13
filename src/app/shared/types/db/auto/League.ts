import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class League implements Table {

    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    type_league_id: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.name = values.name;
            this.description = values.description;
            this.type_league_id = values.type_league_id;
        }
    }

    getName(): string {
        return 'league';
    }

    fromDbValues(values: any): League {
        const newLeague = new League();
        newLeague.id = values.id;
        newLeague.name = values.name;
        newLeague.description = values.description;
        newLeague.type_league_id = values.type_league_id;
        return newLeague;
    }

    toDbValues(): any {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            type_league_id: this.type_league_id,
        }
    }

    toFormGroup(): any {
        return {
            name: new FormControl(this.name),
            description: new FormControl(this.description),
            type_league_id: new FormControl(this.type_league_id),
        }
    }

}
