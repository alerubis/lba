import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Formula implements Table {

    id: number | undefined;
    name: string | undefined;
    formula: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.name = values.name;
            this.formula = values.formula;
        }
    }

    getName(): string {
        return 'formula';
    }

    fromDbValues(values: any): Formula {
        const newFormula = new Formula();
        newFormula.id = values.id;
        newFormula.name = values.name;
        newFormula.formula = values.formula;
        return newFormula;
    }

    toDbValues(): any {
        return {
            id: this.id,
            name: this.name,
            formula: this.formula,
        }
    }

    toFormGroup(): any {
        return {
            name: new FormControl(this.name),
            formula: new FormControl(this.formula),
        }
    }

}
