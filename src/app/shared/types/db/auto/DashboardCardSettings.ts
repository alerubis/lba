import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class DashboardCardSettings implements Table {

    dashboard_id: number | undefined;
    dashboard_card_id: number | undefined;
    card_id: string | undefined;
    setting_id: string | undefined;
    value: any | undefined;

    constructor(values?: any) {
        if (values) {
            this.dashboard_id = values.dashboard_id;
            this.dashboard_card_id = values.dashboard_card_id;
            this.card_id = values.card_id;
            this.setting_id = values.setting_id;
            this.value = values.value;
        }
    }

    getName(): string {
        return 'dashboard_card_settings';
    }

    fromDbValues(values: any): DashboardCardSettings {
        const newDashboardCardSettings = new DashboardCardSettings();
        newDashboardCardSettings.dashboard_id = values.dashboard_id;
        newDashboardCardSettings.dashboard_card_id = values.dashboard_card_id;
        newDashboardCardSettings.card_id = values.card_id;
        newDashboardCardSettings.setting_id = values.setting_id;
        newDashboardCardSettings.value = values.value;
        return newDashboardCardSettings;
    }

    toDbValues(): any {
        return {
            dashboard_id: this.dashboard_id,
            dashboard_card_id: this.dashboard_card_id,
            card_id: this.card_id,
            setting_id: this.setting_id,
            value: this.value,
        }
    }

    toFormGroup(): any {
        return {
            dashboard_id: new FormControl(this.dashboard_id),
            dashboard_card_id: new FormControl(this.dashboard_card_id),
            card_id: new FormControl(this.card_id),
            setting_id: new FormControl(this.setting_id),
            value: new FormControl(this.value),
        }
    }

}
