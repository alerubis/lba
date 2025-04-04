import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VTeamGameMinuteBoxscore implements Table {

    team_id: number | undefined;
    game_id: number | undefined;
    minute: number | undefined;
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
            this.team_id = values.team_id;
            this.game_id = values.game_id;
            this.minute = values.minute;
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
        return 'v_team_game_minute_boxscore';
    }

    fromDbValues(values: any): VTeamGameMinuteBoxscore {
        const newVTeamGameMinuteBoxscore = new VTeamGameMinuteBoxscore();
        newVTeamGameMinuteBoxscore.team_id = values.team_id;
        newVTeamGameMinuteBoxscore.game_id = values.game_id;
        newVTeamGameMinuteBoxscore.minute = values.minute;
        newVTeamGameMinuteBoxscore.type_game_id = values.type_game_id;
        newVTeamGameMinuteBoxscore.league_year_id = values.league_year_id;
        newVTeamGameMinuteBoxscore.league_id = values.league_id;
        newVTeamGameMinuteBoxscore.fouls_committed = values.fouls_committed;
        newVTeamGameMinuteBoxscore.fouls_received = values.fouls_received;
        newVTeamGameMinuteBoxscore.points = values.points;
        newVTeamGameMinuteBoxscore.made_2pt = values.made_2pt;
        newVTeamGameMinuteBoxscore.missed_2pt = values.missed_2pt;
        newVTeamGameMinuteBoxscore.pct_2pt = values.pct_2pt;
        newVTeamGameMinuteBoxscore.made_3pt = values.made_3pt;
        newVTeamGameMinuteBoxscore.missed_3pt = values.missed_3pt;
        newVTeamGameMinuteBoxscore.pct_3pt = values.pct_3pt;
        newVTeamGameMinuteBoxscore.made_ft = values.made_ft;
        newVTeamGameMinuteBoxscore.missed_ft = values.missed_ft;
        newVTeamGameMinuteBoxscore.pct_ft = values.pct_ft;
        newVTeamGameMinuteBoxscore.off_reb = values.off_reb;
        newVTeamGameMinuteBoxscore.def_reb = values.def_reb;
        newVTeamGameMinuteBoxscore.blocks_made = values.blocks_made;
        newVTeamGameMinuteBoxscore.blocks_suffered = values.blocks_suffered;
        newVTeamGameMinuteBoxscore.turnovers = values.turnovers;
        newVTeamGameMinuteBoxscore.steals = values.steals;
        newVTeamGameMinuteBoxscore.assists = values.assists;
        return newVTeamGameMinuteBoxscore;
    }

    toDbValues(): any {
        return {
            team_id: this.team_id,
            game_id: this.game_id,
            minute: this.minute,
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
            team_id: new FormControl(this.team_id),
            game_id: new FormControl(this.game_id),
            minute: new FormControl(this.minute),
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
