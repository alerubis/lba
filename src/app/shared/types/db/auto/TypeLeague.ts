import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class TypeLeague implements Table {

    id: number | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'type_league';
    }

    fromDbValues(values: any): TypeLeague {
        const newTypeLeague = new TypeLeague();
        newTypeLeague.id = values.id;
        newTypeLeague.description = values.description;
        return newTypeLeague;
    }

    toDbValues(): any {
        return {
            id: this.id,
            description: this.description,
        }
    }

    toFormGroup(): any {
        return {
            description: new FormControl(this.description),
        }
    }

}
