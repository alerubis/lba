import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Referee implements Table {

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
        return 'referee';
    }

    fromDbValues(values: any): Referee {
        const newReferee = new Referee();
        newReferee.id = values.id;
        newReferee.name = values.name;
        newReferee.surname = values.surname;
        return newReferee;
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
