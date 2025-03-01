import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Card implements Table {

    id: number | undefined;
    card_type_id: string | undefined;
    description: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.card_type_id = values.card_type_id;
            this.description = values.description;
        }
    }

    getName(): string {
        return 'card';
    }

    fromDbValues(values: any): Card {
        const newCard = new Card();
        newCard.id = values.id;
        newCard.card_type_id = values.card_type_id;
        newCard.description = values.description;
        return newCard;
    }

    toDbValues(): any {
        return {
            id: this.id,
            card_type_id: this.card_type_id,
            description: this.description,
        }
    }

    toFormGroup(): any {
        return {
            card_type_id: new FormControl(this.card_type_id),
            description: new FormControl(this.description),
        }
    }

}
