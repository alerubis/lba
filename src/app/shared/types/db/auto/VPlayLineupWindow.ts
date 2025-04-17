import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VPlayLineupWindow implements Table {

    play_id: number | undefined;
    game_id: number | undefined;
    team_id: number | undefined;
    seconds_start: number | undefined;
    seconds_end: number | undefined;
    player_ids: string | undefined;
    lineup_hash: string | undefined;

    constructor(values?: any) {
        if (values) {
            this.play_id = values.play_id;
            this.game_id = values.game_id;
            this.team_id = values.team_id;
            this.seconds_start = values.seconds_start;
            this.seconds_end = values.seconds_end;
            this.player_ids = values.player_ids;
            this.lineup_hash = values.lineup_hash;
        }
    }

    getName(): string {
        return 'v_play_lineup_window';
    }

    fromDbValues(values: any): VPlayLineupWindow {
        const newVPlayLineupWindow = new VPlayLineupWindow();
        newVPlayLineupWindow.play_id = values.play_id;
        newVPlayLineupWindow.game_id = values.game_id;
        newVPlayLineupWindow.team_id = values.team_id;
        newVPlayLineupWindow.seconds_start = values.seconds_start;
        newVPlayLineupWindow.seconds_end = values.seconds_end;
        newVPlayLineupWindow.player_ids = values.player_ids;
        newVPlayLineupWindow.lineup_hash = values.lineup_hash;
        return newVPlayLineupWindow;
    }

    toDbValues(): any {
        return {
            play_id: this.play_id,
            game_id: this.game_id,
            team_id: this.team_id,
            seconds_start: this.seconds_start,
            seconds_end: this.seconds_end,
            player_ids: this.player_ids,
            lineup_hash: this.lineup_hash,
        }
    }

    toFormGroup(): any {
        return {
            play_id: new FormControl(this.play_id),
            game_id: new FormControl(this.game_id),
            team_id: new FormControl(this.team_id),
            seconds_start: new FormControl(this.seconds_start),
            seconds_end: new FormControl(this.seconds_end),
            player_ids: new FormControl(this.player_ids),
            lineup_hash: new FormControl(this.lineup_hash),
        }
    }

}
