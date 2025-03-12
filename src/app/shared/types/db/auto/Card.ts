import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Card implements Table {

    id: string | undefined;
    description: string | undefined;
    view_name: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.description = values.description;
            this.view_name = values.view_name;
        }
    }

    getName(): string {
        return 'card';
    }

    fromDbValues(values: any): Card {
        const newCard = new Card();
        newCard.id = values.id;
        newCard.description = values.description;
        newCard.view_name = values.view_name;
        return newCard;
    }

    toDbValues(): any {
        return {
            id: this.id,
            description: this.description,
            view_name: this.view_name,
        }
    }

    toFormGroup(): any {
        return {
            description: new FormControl(this.description),
            view_name: new FormControl(this.view_name),
        }
    }

}
