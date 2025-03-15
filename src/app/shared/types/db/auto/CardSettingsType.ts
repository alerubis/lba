import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class CardSettingsType implements Table {

    id: string | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'card_settings_type';
    }

    fromDbValues(values: any): CardSettingsType {
        const newCardSettingsType = new CardSettingsType();
        newCardSettingsType.id = values.id;
        newCardSettingsType.description = values.description;
        return newCardSettingsType;
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
