import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class DzShot implements Table {

    id: number | undefined;
    description: string | undefined;
    point: number | undefined;
    made_01: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.description = values.description;
            this.point = values.point;
            this.made_01 = values.made_01;
        }
    }

    getName(): string {
        return 'dz_shot';
    }

    fromDbValues(values: any): DzShot {
        const newDzShot = new DzShot();
        newDzShot.id = values.id;
        newDzShot.description = values.description;
        newDzShot.point = values.point;
        newDzShot.made_01 = values.made_01;
        return newDzShot;
    }

    toDbValues(): any {
        return {
            id: this.id,
            description: this.description,
            point: this.point,
            made_01: this.made_01,
        }
    }

    toFormGroup(): any {
        return {
            description: new FormControl(this.description),
            point: new FormControl(this.point),
            made_01: new FormControl(this.made_01),
        }
    }

}
