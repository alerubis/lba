import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class TypeGame implements Table {

    id: number | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'type_game';
    }

    fromDbValues(values: any): TypeGame {
        const newTypeGame = new TypeGame();
        newTypeGame.id = values.id;
        newTypeGame.description = values.description;
        return newTypeGame;
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
