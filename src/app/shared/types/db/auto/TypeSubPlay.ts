import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class TypeSubPlay implements Table {

    id: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
        }
    }

    getName(): string {
        return 'type_sub_play';
    }

    fromDbValues(values: any): TypeSubPlay {
        const newTypeSubPlay = new TypeSubPlay();
        newTypeSubPlay.id = values.id;
        return newTypeSubPlay;
    }

    toDbValues(): any {
        return {
            id: this.id,
        }
    }

    toFormGroup(): any {
        return {
        }
    }

}
