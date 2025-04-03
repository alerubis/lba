import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VPlayerGameMinuteBoxscore implements Table {

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
    player_name: string | undefined;
    player_surname: string | undefined;
    team_name: string | undefined;
    type_game_id: number | undefined;
    league_year_id: number | undefined;
    league_id: number | undefined;

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
            this.player_name = values.player_name;
            this.player_surname = values.player_surname;
            this.team_name = values.team_name;
            this.type_game_id = values.type_game_id;
            this.league_year_id = values.league_year_id;
            this.league_id = values.league_id;
        }
    }

    getName(): string {
        return 'v_player_game_minute_boxscore';
    }

    fromDbValues(values: any): VPlayerGameMinuteBoxscore {
        const newVPlayerGameMinuteBoxscore = new VPlayerGameMinuteBoxscore();
        newVPlayerGameMinuteBoxscore.player_id = values.player_id;
        newVPlayerGameMinuteBoxscore.game_id = values.game_id;
        newVPlayerGameMinuteBoxscore.minute = values.minute;
        newVPlayerGameMinuteBoxscore.fouls_committed = values.fouls_committed;
        newVPlayerGameMinuteBoxscore.fouls_received = values.fouls_received;
        newVPlayerGameMinuteBoxscore.points = values.points;
        newVPlayerGameMinuteBoxscore.made_2pt = values.made_2pt;
        newVPlayerGameMinuteBoxscore.missed_2pt = values.missed_2pt;
        newVPlayerGameMinuteBoxscore.pct_2pt = values.pct_2pt;
        newVPlayerGameMinuteBoxscore.made_3pt = values.made_3pt;
        newVPlayerGameMinuteBoxscore.missed_3pt = values.missed_3pt;
        newVPlayerGameMinuteBoxscore.pct_3pt = values.pct_3pt;
        newVPlayerGameMinuteBoxscore.made_ft = values.made_ft;
        newVPlayerGameMinuteBoxscore.missed_ft = values.missed_ft;
        newVPlayerGameMinuteBoxscore.pct_ft = values.pct_ft;
        newVPlayerGameMinuteBoxscore.off_reb = values.off_reb;
        newVPlayerGameMinuteBoxscore.def_reb = values.def_reb;
        newVPlayerGameMinuteBoxscore.blocks_made = values.blocks_made;
        newVPlayerGameMinuteBoxscore.blocks_suffered = values.blocks_suffered;
        newVPlayerGameMinuteBoxscore.turnovers = values.turnovers;
        newVPlayerGameMinuteBoxscore.steals = values.steals;
        newVPlayerGameMinuteBoxscore.assists = values.assists;
        newVPlayerGameMinuteBoxscore.player_name = values.player_name;
        newVPlayerGameMinuteBoxscore.player_surname = values.player_surname;
        newVPlayerGameMinuteBoxscore.team_name = values.team_name;
        newVPlayerGameMinuteBoxscore.type_game_id = values.type_game_id;
        newVPlayerGameMinuteBoxscore.league_year_id = values.league_year_id;
        newVPlayerGameMinuteBoxscore.league_id = values.league_id;
        return newVPlayerGameMinuteBoxscore;
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
            player_name: this.player_name,
            player_surname: this.player_surname,
            team_name: this.team_name,
            type_game_id: this.type_game_id,
            league_year_id: this.league_year_id,
            league_id: this.league_id,
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
            player_name: new FormControl(this.player_name),
            player_surname: new FormControl(this.player_surname),
            team_name: new FormControl(this.team_name),
            type_game_id: new FormControl(this.type_game_id),
            league_year_id: new FormControl(this.league_year_id),
            league_id: new FormControl(this.league_id),
        }
    }

}
