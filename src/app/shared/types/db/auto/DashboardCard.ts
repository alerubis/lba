import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class DashboardCard implements Table {

    id: number | undefined;
    user_id: number | undefined;
    dashboard_id: number | undefined;
    card_id: number | undefined;
    x: number | undefined;
    y: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.user_id = values.user_id;
            this.dashboard_id = values.dashboard_id;
            this.card_id = values.card_id;
            this.x = values.x;
            this.y = values.y;
        }
    }

    getName(): string {
        return 'dashboard_card';
    }

    fromDbValues(values: any): DashboardCard {
        const newDashboardCard = new DashboardCard();
        newDashboardCard.id = values.id;
        newDashboardCard.user_id = values.user_id;
        newDashboardCard.dashboard_id = values.dashboard_id;
        newDashboardCard.card_id = values.card_id;
        newDashboardCard.x = values.x;
        newDashboardCard.y = values.y;
        return newDashboardCard;
    }

    toDbValues(): any {
        return {
            id: this.id,
            user_id: this.user_id,
            dashboard_id: this.dashboard_id,
            card_id: this.card_id,
            x: this.x,
            y: this.y,
        }
    }

    toFormGroup(): any {
        return {
            user_id: new FormControl(this.user_id),
            dashboard_id: new FormControl(this.dashboard_id),
            card_id: new FormControl(this.card_id),
            x: new FormControl(this.x),
            y: new FormControl(this.y),
        }
    }

}
