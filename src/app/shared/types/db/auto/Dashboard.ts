import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Dashboard implements Table {

    id: number | undefined;
    team_id: number | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.team_id = values.team_id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'dashboard';
    }

    fromDbValues(values: any): Dashboard {
        const newDashboard = new Dashboard();
        newDashboard.id = values.id;
        newDashboard.team_id = values.team_id;
        newDashboard.description = values.description;
        return newDashboard;
    }

    toDbValues(): any {
        return {
            id: this.id,
            team_id: this.team_id,
            description: this.description,
        }
    }

    toFormGroup(): any {
        return {
            team_id: new FormControl(this.team_id),
            description: new FormControl(this.description),
        }
    }

}
