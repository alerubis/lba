import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Dashboard implements Table {

    dashboard_id: number | undefined;
    card_type_id: string | undefined;
    team_id: number | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.dashboard_id = values.dashboard_id;
            this.card_type_id = values.card_type_id;
            this.team_id = values.team_id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'dashboard';
    }

    fromDbValues(values: any): Dashboard {
        const newDashboard = new Dashboard();
        newDashboard.dashboard_id = values.dashboard_id;
        newDashboard.card_type_id = values.card_type_id;
        newDashboard.team_id = values.team_id;
        newDashboard.description = values.description;
        return newDashboard;
    }

    toDbValues(): any {
        return {
            dashboard_id: this.dashboard_id,
            card_type_id: this.card_type_id,
            team_id: this.team_id,
            description: this.description,
        }
    }

    toFormGroup(): any {
        return {
            dashboard_id: new FormControl(this.dashboard_id),
            card_type_id: new FormControl(this.card_type_id),
            team_id: new FormControl(this.team_id),
            description: new FormControl(this.description),
        }
    }

}
