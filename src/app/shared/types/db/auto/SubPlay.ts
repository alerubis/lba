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
    type_sub_play_id: number | undefined;

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
            this.type_sub_play_id = values.type_sub_play_id;
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
        newSubPlay.type_sub_play_id = values.type_sub_play_id;
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
            type_sub_play_id: this.type_sub_play_id,
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
            type_sub_play_id: new FormControl(this.type_sub_play_id),
        }
    }

}
