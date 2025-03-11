import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class DzInfraction implements Table {

    id: number | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'dz_infraction';
    }

    fromDbValues(values: any): DzInfraction {
        const newDzInfraction = new DzInfraction();
        newDzInfraction.id = values.id;
        newDzInfraction.description = values.description;
        return newDzInfraction;
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
