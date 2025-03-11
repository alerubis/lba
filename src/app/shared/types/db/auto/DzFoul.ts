import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class DzFoul implements Table {

    id: number | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'dz_foul';
    }

    fromDbValues(values: any): DzFoul {
        const newDzFoul = new DzFoul();
        newDzFoul.id = values.id;
        newDzFoul.description = values.description;
        return newDzFoul;
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
