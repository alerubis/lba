import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Player implements Table {

    id: number | undefined;
    name: string | undefined;
    surname: string | undefined;
    height: number | undefined;
    year: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.name = values.name;
            this.surname = values.surname;
            this.height = values.height;
            this.year = values.year;
        }
    }

    getName(): string {
        return 'player';
    }

    fromDbValues(values: any): Player {
        const newPlayer = new Player();
        newPlayer.id = values.id;
        newPlayer.name = values.name;
        newPlayer.surname = values.surname;
        newPlayer.height = values.height;
        newPlayer.year = values.year;
        return newPlayer;
    }

    toDbValues(): any {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            height: this.height,
            year: this.year,
        }
    }

    toFormGroup(): any {
        return {
            name: new FormControl(this.name),
            surname: new FormControl(this.surname),
            height: new FormControl(this.height),
            year: new FormControl(this.year),
        }
    }

}
