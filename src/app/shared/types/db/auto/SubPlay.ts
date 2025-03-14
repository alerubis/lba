import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class SubPlay implements Table {

    id: number | undefined;
    play_id: number | undefined;
    seconds_da_start: number | undefined;
    player_made_id: number | undefined;
    team_made_id: number | undefined;
    game_made_id: number | undefined;
    player_suffered_id: number | undefined;
    team_suffered_id: number | undefined;
    game_suffered_id: number | undefined;
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
            this.play_id = values.play_id;
            this.seconds_da_start = values.seconds_da_start;
            this.player_made_id = values.player_made_id;
            this.team_made_id = values.team_made_id;
            this.game_made_id = values.game_made_id;
            this.player_suffered_id = values.player_suffered_id;
            this.team_suffered_id = values.team_suffered_id;
            this.game_suffered_id = values.game_suffered_id;
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
        return 'sub_play';
    }

    fromDbValues(values: any): SubPlay {
        const newSubPlay = new SubPlay();
        newSubPlay.id = values.id;
        newSubPlay.play_id = values.play_id;
        newSubPlay.seconds_da_start = values.seconds_da_start;
        newSubPlay.player_made_id = values.player_made_id;
        newSubPlay.team_made_id = values.team_made_id;
        newSubPlay.game_made_id = values.game_made_id;
        newSubPlay.player_suffered_id = values.player_suffered_id;
        newSubPlay.team_suffered_id = values.team_suffered_id;
        newSubPlay.game_suffered_id = values.game_suffered_id;
        newSubPlay.shot_id = values.shot_id;
        newSubPlay.turnover_id = values.turnover_id;
        newSubPlay.foul_id = values.foul_id;
        newSubPlay.infraction_id = values.infraction_id;
        newSubPlay.rebound_defensive_01 = values.rebound_defensive_01;
        newSubPlay.rebound_offensive_01 = values.rebound_offensive_01;
        newSubPlay.assist_01 = values.assist_01;
        newSubPlay.blocks_01 = values.blocks_01;
        newSubPlay.time_out_01 = values.time_out_01;
        newSubPlay.x = values.x;
        newSubPlay.y = values.y;
        return newSubPlay;
    }

    toDbValues(): any {
        return {
            id: this.id,
            play_id: this.play_id,
            seconds_da_start: this.seconds_da_start,
            player_made_id: this.player_made_id,
            team_made_id: this.team_made_id,
            game_made_id: this.game_made_id,
            player_suffered_id: this.player_suffered_id,
            team_suffered_id: this.team_suffered_id,
            game_suffered_id: this.game_suffered_id,
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
            play_id: new FormControl(this.play_id),
            seconds_da_start: new FormControl(this.seconds_da_start),
            player_made_id: new FormControl(this.player_made_id),
            team_made_id: new FormControl(this.team_made_id),
            game_made_id: new FormControl(this.game_made_id),
            player_suffered_id: new FormControl(this.player_suffered_id),
            team_suffered_id: new FormControl(this.team_suffered_id),
            game_suffered_id: new FormControl(this.game_suffered_id),
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
