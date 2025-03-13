import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Card implements Table {

    card_id: string | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.card_id = values.card_id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'card';
    }

    fromDbValues(values: any): Card {
        const newCard = new Card();
        newCard.card_id = values.card_id;
        newCard.description = values.description;
        return newCard;
    }

    toDbValues(): any {
        return {
            card_id: this.card_id,
            description: this.description,
        }
    }

    toFormGroup(): any {
        return {
            card_id: new FormControl(this.card_id),
            description: new FormControl(this.description),
        }
    }

}
