import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class Play implements Table {

    id: number | undefined;
    game_id: number | undefined;
    seconds_start: number | undefined;
    seconds_end: number | undefined;
    quarter: number | undefined;
    attack_home_01: string | undefined;
    score_home: number | undefined;
    score_guest: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.game_id = values.game_id;
            this.seconds_start = values.seconds_start;
            this.seconds_end = values.seconds_end;
            this.quarter = values.quarter;
            this.attack_home_01 = values.attack_home_01;
            this.score_home = values.score_home;
            this.score_guest = values.score_guest;
        }
    }

    getName(): string {
        return 'play';
    }

    fromDbValues(values: any): Play {
        const newPlay = new Play();
        newPlay.id = values.id;
        newPlay.game_id = values.game_id;
        newPlay.seconds_start = values.seconds_start;
        newPlay.seconds_end = values.seconds_end;
        newPlay.quarter = values.quarter;
        newPlay.attack_home_01 = values.attack_home_01;
        newPlay.score_home = values.score_home;
        newPlay.score_guest = values.score_guest;
        return newPlay;
    }

    toDbValues(): any {
        return {
            id: this.id,
            game_id: this.game_id,
            seconds_start: this.seconds_start,
            seconds_end: this.seconds_end,
            quarter: this.quarter,
            attack_home_01: this.attack_home_01,
            score_home: this.score_home,
            score_guest: this.score_guest,
        }
    }

    toFormGroup(): any {
        return {
            game_id: new FormControl(this.game_id),
            seconds_start: new FormControl(this.seconds_start),
            seconds_end: new FormControl(this.seconds_end),
            quarter: new FormControl(this.quarter),
            attack_home_01: new FormControl(this.attack_home_01),
            score_home: new FormControl(this.score_home),
            score_guest: new FormControl(this.score_guest),
        }
    }

}
