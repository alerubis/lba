import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VPlayerGameMinuteBoxscoreBase implements Table {

    player_id: number | undefined;
    game_id: number | undefined;
    minute: Date | undefined;
    fouls_committed: Date | undefined;
    fouls_received: Date | undefined;
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
    off_reb: Date | undefined;
    def_reb: Date | undefined;
    blocks_made: Date | undefined;
    blocks_suffered: Date | undefined;
    turnovers: Date | undefined;
    steals: Date | undefined;
    assists: Date | undefined;

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
        return 'v_player_game_minute_boxscore_base';
    }

    fromDbValues(values: any): VPlayerGameMinuteBoxscoreBase {
        const newVPlayerGameMinuteBoxscoreBase = new VPlayerGameMinuteBoxscoreBase();
        newVPlayerGameMinuteBoxscoreBase.player_id = values.player_id;
        newVPlayerGameMinuteBoxscoreBase.game_id = values.game_id;
        newVPlayerGameMinuteBoxscoreBase.minute = DbUtils.epochToDate(values.minute);
        newVPlayerGameMinuteBoxscoreBase.fouls_committed = DbUtils.epochToDate(values.fouls_committed);
        newVPlayerGameMinuteBoxscoreBase.fouls_received = DbUtils.epochToDate(values.fouls_received);
        newVPlayerGameMinuteBoxscoreBase.points = values.points;
        newVPlayerGameMinuteBoxscoreBase.made_2pt = values.made_2pt;
        newVPlayerGameMinuteBoxscoreBase.missed_2pt = values.missed_2pt;
        newVPlayerGameMinuteBoxscoreBase.pct_2pt = values.pct_2pt;
        newVPlayerGameMinuteBoxscoreBase.made_3pt = values.made_3pt;
        newVPlayerGameMinuteBoxscoreBase.missed_3pt = values.missed_3pt;
        newVPlayerGameMinuteBoxscoreBase.pct_3pt = values.pct_3pt;
        newVPlayerGameMinuteBoxscoreBase.made_ft = values.made_ft;
        newVPlayerGameMinuteBoxscoreBase.missed_ft = values.missed_ft;
        newVPlayerGameMinuteBoxscoreBase.pct_ft = values.pct_ft;
        newVPlayerGameMinuteBoxscoreBase.off_reb = DbUtils.epochToDate(values.off_reb);
        newVPlayerGameMinuteBoxscoreBase.def_reb = DbUtils.epochToDate(values.def_reb);
        newVPlayerGameMinuteBoxscoreBase.blocks_made = DbUtils.epochToDate(values.blocks_made);
        newVPlayerGameMinuteBoxscoreBase.blocks_suffered = DbUtils.epochToDate(values.blocks_suffered);
        newVPlayerGameMinuteBoxscoreBase.turnovers = DbUtils.epochToDate(values.turnovers);
        newVPlayerGameMinuteBoxscoreBase.steals = DbUtils.epochToDate(values.steals);
        newVPlayerGameMinuteBoxscoreBase.assists = DbUtils.epochToDate(values.assists);
        return newVPlayerGameMinuteBoxscoreBase;
    }

    toDbValues(): any {
        return {
            player_id: this.player_id,
            game_id: this.game_id,
            minute: DbUtils.dateToEpoch(this.minute),
            fouls_committed: DbUtils.dateToEpoch(this.fouls_committed),
            fouls_received: DbUtils.dateToEpoch(this.fouls_received),
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
            off_reb: DbUtils.dateToEpoch(this.off_reb),
            def_reb: DbUtils.dateToEpoch(this.def_reb),
            blocks_made: DbUtils.dateToEpoch(this.blocks_made),
            blocks_suffered: DbUtils.dateToEpoch(this.blocks_suffered),
            turnovers: DbUtils.dateToEpoch(this.turnovers),
            steals: DbUtils.dateToEpoch(this.steals),
            assists: DbUtils.dateToEpoch(this.assists),
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
