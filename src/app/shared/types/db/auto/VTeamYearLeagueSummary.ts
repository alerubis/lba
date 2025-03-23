import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VTeamYearLeagueSummary implements Table {

    team_id: number | undefined;
    team_name: string | undefined;
    league_year_id: number | undefined;
    league_id: number | undefined;
    league_name: string | undefined;
    total_sub_plays: Date | undefined;
    total_shots: any | undefined;
    one_point_shots_made: any | undefined;
    one_point_shots_miss: any | undefined;
    two_point_shots_made: any | undefined;
    two_point_shots_miss: any | undefined;
    three_point_shots_made: any | undefined;
    three_point_shots_miss: any | undefined;
    one_point_shot_perc: any | undefined;
    two_point_shot_perc: any | undefined;
    three_point_shot_perc: any | undefined;
    total_fouls: any | undefined;
    total_infractions: any | undefined;
    total_turnovers: any | undefined;
    total_defensive_rebounds: any | undefined;
    total_offensive_rebounds: any | undefined;
    total_assists: any | undefined;
    total_blocks: any | undefined;
    total_timeouts: any | undefined;

    constructor(values?: any) {
        if (values) {
            this.team_id = values.team_id;
            this.team_name = values.team_name;
            this.league_year_id = values.league_year_id;
            this.league_id = values.league_id;
            this.league_name = values.league_name;
            this.total_sub_plays = values.total_sub_plays;
            this.total_shots = values.total_shots;
            this.one_point_shots_made = values.one_point_shots_made;
            this.one_point_shots_miss = values.one_point_shots_miss;
            this.two_point_shots_made = values.two_point_shots_made;
            this.two_point_shots_miss = values.two_point_shots_miss;
            this.three_point_shots_made = values.three_point_shots_made;
            this.three_point_shots_miss = values.three_point_shots_miss;
            this.one_point_shot_perc = values.one_point_shot_perc;
            this.two_point_shot_perc = values.two_point_shot_perc;
            this.three_point_shot_perc = values.three_point_shot_perc;
            this.total_fouls = values.total_fouls;
            this.total_infractions = values.total_infractions;
            this.total_turnovers = values.total_turnovers;
            this.total_defensive_rebounds = values.total_defensive_rebounds;
            this.total_offensive_rebounds = values.total_offensive_rebounds;
            this.total_assists = values.total_assists;
            this.total_blocks = values.total_blocks;
            this.total_timeouts = values.total_timeouts;
        }
    }

    getName(): string {
        return 'v_team_year_league_summary';
    }

    fromDbValues(values: any): VTeamYearLeagueSummary {
        const newVTeamYearLeagueSummary = new VTeamYearLeagueSummary();
        newVTeamYearLeagueSummary.team_id = values.team_id;
        newVTeamYearLeagueSummary.team_name = values.team_name;
        newVTeamYearLeagueSummary.league_year_id = values.league_year_id;
        newVTeamYearLeagueSummary.league_id = values.league_id;
        newVTeamYearLeagueSummary.league_name = values.league_name;
        newVTeamYearLeagueSummary.total_sub_plays = DbUtils.epochToDate(values.total_sub_plays);
        newVTeamYearLeagueSummary.total_shots = values.total_shots;
        newVTeamYearLeagueSummary.one_point_shots_made = values.one_point_shots_made;
        newVTeamYearLeagueSummary.one_point_shots_miss = values.one_point_shots_miss;
        newVTeamYearLeagueSummary.two_point_shots_made = values.two_point_shots_made;
        newVTeamYearLeagueSummary.two_point_shots_miss = values.two_point_shots_miss;
        newVTeamYearLeagueSummary.three_point_shots_made = values.three_point_shots_made;
        newVTeamYearLeagueSummary.three_point_shots_miss = values.three_point_shots_miss;
        newVTeamYearLeagueSummary.one_point_shot_perc = values.one_point_shot_perc;
        newVTeamYearLeagueSummary.two_point_shot_perc = values.two_point_shot_perc;
        newVTeamYearLeagueSummary.three_point_shot_perc = values.three_point_shot_perc;
        newVTeamYearLeagueSummary.total_fouls = values.total_fouls;
        newVTeamYearLeagueSummary.total_infractions = values.total_infractions;
        newVTeamYearLeagueSummary.total_turnovers = values.total_turnovers;
        newVTeamYearLeagueSummary.total_defensive_rebounds = values.total_defensive_rebounds;
        newVTeamYearLeagueSummary.total_offensive_rebounds = values.total_offensive_rebounds;
        newVTeamYearLeagueSummary.total_assists = values.total_assists;
        newVTeamYearLeagueSummary.total_blocks = values.total_blocks;
        newVTeamYearLeagueSummary.total_timeouts = values.total_timeouts;
        return newVTeamYearLeagueSummary;
    }

    toDbValues(): any {
        return {
            team_id: this.team_id,
            team_name: this.team_name,
            league_year_id: this.league_year_id,
            league_id: this.league_id,
            league_name: this.league_name,
            total_sub_plays: DbUtils.dateToEpoch(this.total_sub_plays),
            total_shots: this.total_shots,
            one_point_shots_made: this.one_point_shots_made,
            one_point_shots_miss: this.one_point_shots_miss,
            two_point_shots_made: this.two_point_shots_made,
            two_point_shots_miss: this.two_point_shots_miss,
            three_point_shots_made: this.three_point_shots_made,
            three_point_shots_miss: this.three_point_shots_miss,
            one_point_shot_perc: this.one_point_shot_perc,
            two_point_shot_perc: this.two_point_shot_perc,
            three_point_shot_perc: this.three_point_shot_perc,
            total_fouls: this.total_fouls,
            total_infractions: this.total_infractions,
            total_turnovers: this.total_turnovers,
            total_defensive_rebounds: this.total_defensive_rebounds,
            total_offensive_rebounds: this.total_offensive_rebounds,
            total_assists: this.total_assists,
            total_blocks: this.total_blocks,
            total_timeouts: this.total_timeouts,
        }
    }

    toFormGroup(): any {
        return {
            team_id: new FormControl(this.team_id),
            team_name: new FormControl(this.team_name),
            league_year_id: new FormControl(this.league_year_id),
            league_id: new FormControl(this.league_id),
            league_name: new FormControl(this.league_name),
            total_sub_plays: new FormControl(this.total_sub_plays),
            total_shots: new FormControl(this.total_shots),
            one_point_shots_made: new FormControl(this.one_point_shots_made),
            one_point_shots_miss: new FormControl(this.one_point_shots_miss),
            two_point_shots_made: new FormControl(this.two_point_shots_made),
            two_point_shots_miss: new FormControl(this.two_point_shots_miss),
            three_point_shots_made: new FormControl(this.three_point_shots_made),
            three_point_shots_miss: new FormControl(this.three_point_shots_miss),
            one_point_shot_perc: new FormControl(this.one_point_shot_perc),
            two_point_shot_perc: new FormControl(this.two_point_shot_perc),
            three_point_shot_perc: new FormControl(this.three_point_shot_perc),
            total_fouls: new FormControl(this.total_fouls),
            total_infractions: new FormControl(this.total_infractions),
            total_turnovers: new FormControl(this.total_turnovers),
            total_defensive_rebounds: new FormControl(this.total_defensive_rebounds),
            total_offensive_rebounds: new FormControl(this.total_offensive_rebounds),
            total_assists: new FormControl(this.total_assists),
            total_blocks: new FormControl(this.total_blocks),
            total_timeouts: new FormControl(this.total_timeouts),
        }
    }

}
