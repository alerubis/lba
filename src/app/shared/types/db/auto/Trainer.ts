import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Trainer implements Table {

    id: number | undefined;
    name: string | undefined;
    surname: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.name = values.name;
            this.surname = values.surname;
        }
    }

    getName(): string {
        return 'trainer';
    }

    fromDbValues(values: any): Trainer {
        const newTrainer = new Trainer();
        newTrainer.id = values.id;
        newTrainer.name = values.name;
        newTrainer.surname = values.surname;
        return newTrainer;
    }

    toDbValues(): any {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
        }
    }

    toFormGroup(): any {
        return {
            name: new FormControl(this.name),
            surname: new FormControl(this.surname),
        }
    }

}
