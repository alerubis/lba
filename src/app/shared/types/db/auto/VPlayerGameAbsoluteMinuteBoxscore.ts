import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VPlayerGameAbsoluteMinuteBoxscore implements Table {

    player_id: number | undefined;
    game_id: number | undefined;
    team_id: number | undefined;
    type_game_id: number | undefined;
    league_year_id: number | undefined;
    league_id: number | undefined;
    absolute_minute: number | undefined;
    fouls_committed: any | undefined;
    fouls_received: any | undefined;
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
    off_reb: any | undefined;
    def_reb: any | undefined;
    blocks_made: any | undefined;
    blocks_suffered: any | undefined;
    turnovers: any | undefined;
    steals: any | undefined;
    assists: any | undefined;

    constructor(values?: any) {
        if (values) {
            this.player_id = values.player_id;
            this.game_id = values.game_id;
            this.team_id = values.team_id;
            this.type_game_id = values.type_game_id;
            this.league_year_id = values.league_year_id;
            this.league_id = values.league_id;
            this.absolute_minute = values.absolute_minute;
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
        return 'v_player_game_absolute_minute_boxscore';
    }

    fromDbValues(values: any): VPlayerGameAbsoluteMinuteBoxscore {
        const newVPlayerGameAbsoluteMinuteBoxscore = new VPlayerGameAbsoluteMinuteBoxscore();
        newVPlayerGameAbsoluteMinuteBoxscore.player_id = values.player_id;
        newVPlayerGameAbsoluteMinuteBoxscore.game_id = values.game_id;
        newVPlayerGameAbsoluteMinuteBoxscore.team_id = values.team_id;
        newVPlayerGameAbsoluteMinuteBoxscore.type_game_id = values.type_game_id;
        newVPlayerGameAbsoluteMinuteBoxscore.league_year_id = values.league_year_id;
        newVPlayerGameAbsoluteMinuteBoxscore.league_id = values.league_id;
        newVPlayerGameAbsoluteMinuteBoxscore.absolute_minute = values.absolute_minute;
        newVPlayerGameAbsoluteMinuteBoxscore.fouls_committed = values.fouls_committed;
        newVPlayerGameAbsoluteMinuteBoxscore.fouls_received = values.fouls_received;
        newVPlayerGameAbsoluteMinuteBoxscore.points = values.points;
        newVPlayerGameAbsoluteMinuteBoxscore.made_2pt = values.made_2pt;
        newVPlayerGameAbsoluteMinuteBoxscore.missed_2pt = values.missed_2pt;
        newVPlayerGameAbsoluteMinuteBoxscore.pct_2pt = values.pct_2pt;
        newVPlayerGameAbsoluteMinuteBoxscore.made_3pt = values.made_3pt;
        newVPlayerGameAbsoluteMinuteBoxscore.missed_3pt = values.missed_3pt;
        newVPlayerGameAbsoluteMinuteBoxscore.pct_3pt = values.pct_3pt;
        newVPlayerGameAbsoluteMinuteBoxscore.made_ft = values.made_ft;
        newVPlayerGameAbsoluteMinuteBoxscore.missed_ft = values.missed_ft;
        newVPlayerGameAbsoluteMinuteBoxscore.pct_ft = values.pct_ft;
        newVPlayerGameAbsoluteMinuteBoxscore.off_reb = values.off_reb;
        newVPlayerGameAbsoluteMinuteBoxscore.def_reb = values.def_reb;
        newVPlayerGameAbsoluteMinuteBoxscore.blocks_made = values.blocks_made;
        newVPlayerGameAbsoluteMinuteBoxscore.blocks_suffered = values.blocks_suffered;
        newVPlayerGameAbsoluteMinuteBoxscore.turnovers = values.turnovers;
        newVPlayerGameAbsoluteMinuteBoxscore.steals = values.steals;
        newVPlayerGameAbsoluteMinuteBoxscore.assists = values.assists;
        return newVPlayerGameAbsoluteMinuteBoxscore;
    }

    toDbValues(): any {
        return {
            player_id: this.player_id,
            game_id: this.game_id,
            team_id: this.team_id,
            type_game_id: this.type_game_id,
            league_year_id: this.league_year_id,
            league_id: this.league_id,
            absolute_minute: this.absolute_minute,
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
            team_id: new FormControl(this.team_id),
            type_game_id: new FormControl(this.type_game_id),
            league_year_id: new FormControl(this.league_year_id),
            league_id: new FormControl(this.league_id),
            absolute_minute: new FormControl(this.absolute_minute),
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
