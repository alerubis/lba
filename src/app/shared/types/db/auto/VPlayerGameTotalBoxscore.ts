import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VPlayerGameTotalBoxscore implements Table {

    player_id: number | undefined;
    game_id: number | undefined;
    team_id: number | undefined;
    type_game_id: number | undefined;
    league_year_id: number | undefined;
    league_id: number | undefined;
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
        return 'v_player_game_total_boxscore';
    }

    fromDbValues(values: any): VPlayerGameTotalBoxscore {
        const newVPlayerGameTotalBoxscore = new VPlayerGameTotalBoxscore();
        newVPlayerGameTotalBoxscore.player_id = values.player_id;
        newVPlayerGameTotalBoxscore.game_id = values.game_id;
        newVPlayerGameTotalBoxscore.team_id = values.team_id;
        newVPlayerGameTotalBoxscore.type_game_id = values.type_game_id;
        newVPlayerGameTotalBoxscore.league_year_id = values.league_year_id;
        newVPlayerGameTotalBoxscore.league_id = values.league_id;
        newVPlayerGameTotalBoxscore.fouls_committed = values.fouls_committed;
        newVPlayerGameTotalBoxscore.fouls_received = values.fouls_received;
        newVPlayerGameTotalBoxscore.points = values.points;
        newVPlayerGameTotalBoxscore.made_2pt = values.made_2pt;
        newVPlayerGameTotalBoxscore.missed_2pt = values.missed_2pt;
        newVPlayerGameTotalBoxscore.pct_2pt = values.pct_2pt;
        newVPlayerGameTotalBoxscore.made_3pt = values.made_3pt;
        newVPlayerGameTotalBoxscore.missed_3pt = values.missed_3pt;
        newVPlayerGameTotalBoxscore.pct_3pt = values.pct_3pt;
        newVPlayerGameTotalBoxscore.made_ft = values.made_ft;
        newVPlayerGameTotalBoxscore.missed_ft = values.missed_ft;
        newVPlayerGameTotalBoxscore.pct_ft = values.pct_ft;
        newVPlayerGameTotalBoxscore.off_reb = values.off_reb;
        newVPlayerGameTotalBoxscore.def_reb = values.def_reb;
        newVPlayerGameTotalBoxscore.blocks_made = values.blocks_made;
        newVPlayerGameTotalBoxscore.blocks_suffered = values.blocks_suffered;
        newVPlayerGameTotalBoxscore.turnovers = values.turnovers;
        newVPlayerGameTotalBoxscore.steals = values.steals;
        newVPlayerGameTotalBoxscore.assists = values.assists;
        return newVPlayerGameTotalBoxscore;
    }

    toDbValues(): any {
        return {
            player_id: this.player_id,
            game_id: this.game_id,
            team_id: this.team_id,
            type_game_id: this.type_game_id,
            league_year_id: this.league_year_id,
            league_id: this.league_id,
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
