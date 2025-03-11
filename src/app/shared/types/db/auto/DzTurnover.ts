import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class DzTurnover implements Table {

    id: number | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'dz_turnover';
    }

    fromDbValues(values: any): DzTurnover {
        const newDzTurnover = new DzTurnover();
        newDzTurnover.id = values.id;
        newDzTurnover.description = values.description;
        return newDzTurnover;
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
