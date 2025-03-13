import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class User implements Table {

    id: number | undefined;
    username: string | undefined;
    password: string | undefined;
    team_id: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.username = values.username;
            this.password = values.password;
            this.team_id = values.team_id;
        }
    }

    getName(): string {
        return 'user';
    }

    fromDbValues(values: any): User {
        const newUser = new User();
        newUser.id = values.id;
        newUser.username = values.username;
        newUser.password = values.password;
        newUser.team_id = values.team_id;
        return newUser;
    }

    toDbValues(): any {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            team_id: this.team_id,
        }
    }

    toFormGroup(): any {
        return {
            username: new FormControl(this.username),
            password: new FormControl(this.password),
            team_id: new FormControl(this.team_id),
        }
    }

}
