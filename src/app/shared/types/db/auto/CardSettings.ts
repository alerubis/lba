import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class CardSettings implements Table {

    card_id: string | undefined;
    setting_id: string | undefined;
    description: string | undefined;
    card_settings_type_id: string | undefined;
    default_value: any | undefined;
    possible_values: any | undefined;

    constructor(values?: any) {
        if (values) {
            this.card_id = values.card_id;
            this.setting_id = values.setting_id;
            this.description = values.description;
            this.card_settings_type_id = values.card_settings_type_id;
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
        newCardSettings.card_settings_type_id = values.card_settings_type_id;
        newCardSettings.default_value = values.default_value;
        newCardSettings.possible_values = values.possible_values;
        return newCardSettings;
    }

    toDbValues(): any {
        return {
            card_id: this.card_id,
            setting_id: this.setting_id,
            description: this.description,
            card_settings_type_id: this.card_settings_type_id,
            default_value: this.default_value,
            possible_values: this.possible_values,
        }
    }

    toFormGroup(): any {
        return {
            card_id: new FormControl(this.card_id),
            setting_id: new FormControl(this.setting_id),
            description: new FormControl(this.description),
            card_settings_type_id: new FormControl(this.card_settings_type_id),
            default_value: new FormControl(this.default_value),
            possible_values: new FormControl(this.possible_values),
        }
    }

}
