import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class DashboardCard implements Table {

    id: number | undefined;
    dashboard_id: number | undefined;
    card_id: string | undefined;
    x: number | undefined;
    y: number | undefined;
    width: number | undefined;
    height: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.dashboard_id = values.dashboard_id;
            this.card_id = values.card_id;
            this.x = values.x;
            this.y = values.y;
            this.width = values.width;
            this.height = values.height;
        }
    }

    getName(): string {
        return 'dashboard_card';
    }

    fromDbValues(values: any): DashboardCard {
        const newDashboardCard = new DashboardCard();
        newDashboardCard.id = values.id;
        newDashboardCard.dashboard_id = values.dashboard_id;
        newDashboardCard.card_id = values.card_id;
        newDashboardCard.x = values.x;
        newDashboardCard.y = values.y;
        newDashboardCard.width = values.width;
        newDashboardCard.height = values.height;
        return newDashboardCard;
    }

    toDbValues(): any {
        return {
            id: this.id,
            dashboard_id: this.dashboard_id,
            card_id: this.card_id,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }
    }

    toFormGroup(): any {
        return {
            dashboard_id: new FormControl(this.dashboard_id),
            card_id: new FormControl(this.card_id),
            x: new FormControl(this.x),
            y: new FormControl(this.y),
            width: new FormControl(this.width),
            height: new FormControl(this.height),
        }
    }

}
