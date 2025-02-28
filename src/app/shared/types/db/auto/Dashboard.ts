import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Dashboard implements Table {

    id: number | undefined;
    user_id: number | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.user_id = values.user_id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'dashboard';
    }

    fromDbValues(values: any): Dashboard {
        const newDashboard = new Dashboard();
        newDashboard.id = values.id;
        newDashboard.user_id = values.user_id;
        newDashboard.description = values.description;
        return newDashboard;
    }

    toDbValues(): any {
        return {
            id: this.id,
            user_id: this.user_id,
            description: this.description,
        }
    }

    toFormGroup(): any {
        return {
            user_id: new FormControl(this.user_id),
            description: new FormControl(this.description),
        }
    }

}
