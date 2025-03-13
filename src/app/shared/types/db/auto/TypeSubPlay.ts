import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class TypeSubPlay implements Table {

    id: number | undefined;
    shot_id: number | undefined;
    turnover_id: number | undefined;
    foul_id: number | undefined;
    infraction_id: number | undefined;
    rebound_defensive_01: string | undefined;
    rebound_offensive_01: string | undefined;
    assist_01: string | undefined;
    blocks_01: string | undefined;
    time_out_01: string | undefined;
    x: number | undefined;
    y: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.id = values.id;
            this.shot_id = values.shot_id;
            this.turnover_id = values.turnover_id;
            this.foul_id = values.foul_id;
            this.infraction_id = values.infraction_id;
            this.rebound_defensive_01 = values.rebound_defensive_01;
            this.rebound_offensive_01 = values.rebound_offensive_01;
            this.assist_01 = values.assist_01;
            this.blocks_01 = values.blocks_01;
            this.time_out_01 = values.time_out_01;
            this.x = values.x;
            this.y = values.y;
        }
    }

    getName(): string {
        return 'type_sub_play';
    }

    fromDbValues(values: any): TypeSubPlay {
        const newTypeSubPlay = new TypeSubPlay();
        newTypeSubPlay.id = values.id;
        newTypeSubPlay.shot_id = values.shot_id;
        newTypeSubPlay.turnover_id = values.turnover_id;
        newTypeSubPlay.foul_id = values.foul_id;
        newTypeSubPlay.infraction_id = values.infraction_id;
        newTypeSubPlay.rebound_defensive_01 = values.rebound_defensive_01;
        newTypeSubPlay.rebound_offensive_01 = values.rebound_offensive_01;
        newTypeSubPlay.assist_01 = values.assist_01;
        newTypeSubPlay.blocks_01 = values.blocks_01;
        newTypeSubPlay.time_out_01 = values.time_out_01;
        newTypeSubPlay.x = values.x;
        newTypeSubPlay.y = values.y;
        return newTypeSubPlay;
    }

    toDbValues(): any {
        return {
            id: this.id,
            shot_id: this.shot_id,
            turnover_id: this.turnover_id,
            foul_id: this.foul_id,
            infraction_id: this.infraction_id,
            rebound_defensive_01: this.rebound_defensive_01,
            rebound_offensive_01: this.rebound_offensive_01,
            assist_01: this.assist_01,
            blocks_01: this.blocks_01,
            time_out_01: this.time_out_01,
            x: this.x,
            y: this.y,
        }
    }

    toFormGroup(): any {
        return {
            shot_id: new FormControl(this.shot_id),
            turnover_id: new FormControl(this.turnover_id),
            foul_id: new FormControl(this.foul_id),
            infraction_id: new FormControl(this.infraction_id),
            rebound_defensive_01: new FormControl(this.rebound_defensive_01),
            rebound_offensive_01: new FormControl(this.rebound_offensive_01),
            assist_01: new FormControl(this.assist_01),
            blocks_01: new FormControl(this.blocks_01),
            time_out_01: new FormControl(this.time_out_01),
            x: new FormControl(this.x),
            y: new FormControl(this.y),
        }
    }

}
