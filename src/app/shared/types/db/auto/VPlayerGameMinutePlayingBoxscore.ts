import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VPlayerGameMinutePlayingBoxscore implements Table {

    player_id: number | undefined;
    game_id: number | undefined;
    minute: number | undefined;
    fouls_committed: number | undefined;
    fouls_received: number | undefined;
    points: any | undefined;
    made_2pt: any | undefined;
    missed_2pt: any | undefined;
    pct_2pt: any | undefined;
    made_3pt: any | undefined;
    missed_3pt: any | undefined;
    pct_3pt: any | undefined;
    made_ft: any | undefined;
    missed_ft: any | undefined;
    pct_ft: any | undefined;
    off_reb: number | undefined;
    def_reb: number | undefined;
    blocks_made: number | undefined;
    blocks_suffered: number | undefined;
    turnovers: number | undefined;
    steals: number | undefined;
    assists: number | undefined;

    constructor(values?: any) {
        if (values) {
            this.player_id = values.player_id;
            this.game_id = values.game_id;
            this.minute = values.minute;
            this.fouls_committed = values.fouls_committed;
            this.fouls_received = values.fouls_received;
            this.points = values.points;
            this.made_2pt = values.made_2pt;
            this.missed_2pt = values.missed_2pt;
            this.pct_2pt = values.pct_2pt;
            this.made_3pt = values.made_3pt;
            this.missed_3pt = values.missed_3pt;
            this.pct_3pt = values.pct_3pt;
            this.made_ft = values.made_ft;
            this.missed_ft = values.missed_ft;
            this.pct_ft = values.pct_ft;
            this.off_reb = values.off_reb;
            this.def_reb = values.def_reb;
            this.blocks_made = values.blocks_made;
            this.blocks_suffered = values.blocks_suffered;
            this.turnovers = values.turnovers;
            this.steals = values.steals;
            this.assists = values.assists;
        }
    }

    getName(): string {
        return 'v_player_game_minute_playing_boxscore';
    }

    fromDbValues(values: any): VPlayerGameMinutePlayingBoxscore {
        const newVPlayerGameMinutePlayingBoxscore = new VPlayerGameMinutePlayingBoxscore();
        newVPlayerGameMinutePlayingBoxscore.player_id = values.player_id;
        newVPlayerGameMinutePlayingBoxscore.game_id = values.game_id;
        newVPlayerGameMinutePlayingBoxscore.minute = values.minute;
        newVPlayerGameMinutePlayingBoxscore.fouls_committed = values.fouls_committed;
        newVPlayerGameMinutePlayingBoxscore.fouls_received = values.fouls_received;
        newVPlayerGameMinutePlayingBoxscore.points = values.points;
        newVPlayerGameMinutePlayingBoxscore.made_2pt = values.made_2pt;
        newVPlayerGameMinutePlayingBoxscore.missed_2pt = values.missed_2pt;
        newVPlayerGameMinutePlayingBoxscore.pct_2pt = values.pct_2pt;
        newVPlayerGameMinutePlayingBoxscore.made_3pt = values.made_3pt;
        newVPlayerGameMinutePlayingBoxscore.missed_3pt = values.missed_3pt;
        newVPlayerGameMinutePlayingBoxscore.pct_3pt = values.pct_3pt;
        newVPlayerGameMinutePlayingBoxscore.made_ft = values.made_ft;
        newVPlayerGameMinutePlayingBoxscore.missed_ft = values.missed_ft;
        newVPlayerGameMinutePlayingBoxscore.pct_ft = values.pct_ft;
        newVPlayerGameMinutePlayingBoxscore.off_reb = values.off_reb;
        newVPlayerGameMinutePlayingBoxscore.def_reb = values.def_reb;
        newVPlayerGameMinutePlayingBoxscore.blocks_made = values.blocks_made;
        newVPlayerGameMinutePlayingBoxscore.blocks_suffered = values.blocks_suffered;
        newVPlayerGameMinutePlayingBoxscore.turnovers = values.turnovers;
        newVPlayerGameMinutePlayingBoxscore.steals = values.steals;
        newVPlayerGameMinutePlayingBoxscore.assists = values.assists;
        return newVPlayerGameMinutePlayingBoxscore;
    }

    toDbValues(): any {
        return {
            player_id: this.player_id,
            game_id: this.game_id,
            minute: this.minute,
            fouls_committed: this.fouls_committed,
            fouls_received: this.fouls_received,
            points: this.points,
            made_2pt: this.made_2pt,
            missed_2pt: this.missed_2pt,
            pct_2pt: this.pct_2pt,
            made_3pt: this.made_3pt,
            missed_3pt: this.missed_3pt,
            pct_3pt: this.pct_3pt,
            made_ft: this.made_ft,
            missed_ft: this.missed_ft,
            pct_ft: this.pct_ft,
            off_reb: this.off_reb,
            def_reb: this.def_reb,
            blocks_made: this.blocks_made,
            blocks_suffered: this.blocks_suffered,
            turnovers: this.turnovers,
            steals: this.steals,
            assists: this.assists,
        }
    }

    toFormGroup(): any {
        return {
            player_id: new FormControl(this.player_id),
            game_id: new FormControl(this.game_id),
            minute: new FormControl(this.minute),
            fouls_committed: new FormControl(this.fouls_committed),
            fouls_received: new FormControl(this.fouls_received),
            points: new FormControl(this.points),
            made_2pt: new FormControl(this.made_2pt),
            missed_2pt: new FormControl(this.missed_2pt),
            pct_2pt: new FormControl(this.pct_2pt),
            made_3pt: new FormControl(this.made_3pt),
            missed_3pt: new FormControl(this.missed_3pt),
            pct_3pt: new FormControl(this.pct_3pt),
            made_ft: new FormControl(this.made_ft),
            missed_ft: new FormControl(this.missed_ft),
            pct_ft: new FormControl(this.pct_ft),
            off_reb: new FormControl(this.off_reb),
            def_reb: new FormControl(this.def_reb),
            blocks_made: new FormControl(this.blocks_made),
            blocks_suffered: new FormControl(this.blocks_suffered),
            turnovers: new FormControl(this.turnovers),
            steals: new FormControl(this.steals),
            assists: new FormControl(this.assists),
        }
    }

}
