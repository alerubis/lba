import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class CardSettings implements Table {

    card_id: string | undefined;
    setting_id: string | undefined;
    description: string | undefined;
    view_column: string | undefined;
    default_value: any | undefined;
    possible_values: any | undefined;

    constructor(values?: any) {
        if (values) {
            this.card_id = values.card_id;
            this.setting_id = values.setting_id;
            this.description = values.description;
            this.view_column = values.view_column;
            this.default_value = values.default_value;
            this.possible_values = values.possible_values;
        }
    }

    getName(): string {
        return 'card_settings';
    }

    fromDbValues(values: any): CardSettings {
        const newCardSettings = new CardSettings();
        newCardSettings.card_id = values.card_id;
        newCardSettings.setting_id = values.setting_id;
        newCardSettings.description = values.description;
        newCardSettings.view_column = values.view_column;
        newCardSettings.default_value = values.default_value;
        newCardSettings.possible_values = values.possible_values;
        return newCardSettings;
    }

    toDbValues(): any {
        return {
            card_id: this.card_id,
            setting_id: this.setting_id,
            description: this.description,
            view_column: this.view_column,
            default_value: this.default_value,
            possible_values: this.possible_values,
        }
    }

    toFormGroup(): any {
        return {
            card_id: new FormControl(this.card_id),
            setting_id: new FormControl(this.setting_id),
            description: new FormControl(this.description),
            view_column: new FormControl(this.view_column),
            default_value: new FormControl(this.default_value),
            possible_values: new FormControl(this.possible_values),
        }
    }

}
