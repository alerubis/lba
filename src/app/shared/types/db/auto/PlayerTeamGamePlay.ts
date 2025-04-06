import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class PlayerTeamGamePlay implements Table {

    player_id: number | undefined;
    team_id: number | undefined;
    game_id: number | undefined;
    play_id: number | undefined;
    seconds_start: number | undefined;
    seconds_end: number | undefined;
    total_seconds_played_before: number | undefined;
    consecutive_seconds_playing: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.player_id = values.player_id;
            this.team_id = values.team_id;
            this.game_id = values.game_id;
            this.play_id = values.play_id;
            this.seconds_start = values.seconds_start;
            this.seconds_end = values.seconds_end;
            this.total_seconds_played_before = values.total_seconds_played_before;
            this.consecutive_seconds_playing = values.consecutive_seconds_playing;
        }
    }

    getName(): string {
        return 'player_team_game_play';
    }

    fromDbValues(values: any): PlayerTeamGamePlay {
        const newPlayerTeamGamePlay = new PlayerTeamGamePlay();
        newPlayerTeamGamePlay.player_id = values.player_id;
        newPlayerTeamGamePlay.team_id = values.team_id;
        newPlayerTeamGamePlay.game_id = values.game_id;
        newPlayerTeamGamePlay.play_id = values.play_id;
        newPlayerTeamGamePlay.seconds_start = values.seconds_start;
        newPlayerTeamGamePlay.seconds_end = values.seconds_end;
        newPlayerTeamGamePlay.total_seconds_played_before = values.total_seconds_played_before;
        newPlayerTeamGamePlay.consecutive_seconds_playing = values.consecutive_seconds_playing;
        return newPlayerTeamGamePlay;
    }

    toDbValues(): any {
        return {
            player_id: this.player_id,
            team_id: this.team_id,
            game_id: this.game_id,
            play_id: this.play_id,
            seconds_start: this.seconds_start,
            seconds_end: this.seconds_end,
            total_seconds_played_before: this.total_seconds_played_before,
            consecutive_seconds_playing: this.consecutive_seconds_playing,
        }
    }

    toFormGroup(): any {
        return {
            player_id: new FormControl(this.player_id),
            team_id: new FormControl(this.team_id),
            game_id: new FormControl(this.game_id),
            play_id: new FormControl(this.play_id),
            seconds_start: new FormControl(this.seconds_start),
            seconds_end: new FormControl(this.seconds_end),
            total_seconds_played_before: new FormControl(this.total_seconds_played_before),
            consecutive_seconds_playing: new FormControl(this.consecutive_seconds_playing),
        }
    }

}
