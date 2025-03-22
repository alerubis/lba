import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class TeamYearLeagueSummaryMinutesQuarter implements Table {

    team_id: number | undefined;
    team_name: string | undefined;
    league_year_id: number | undefined;
    league_id: number | undefined;
    league_name: string | undefined;
    minute_in_quarter: number | undefined;
    total_sub_plays: number | undefined;
    total_shots: any | undefined;
    one_point_shots_made: any | undefined;
    one_point_shots_miss: any | undefined;
    two_point_shots_made: any | undefined;
    two_point_shots_miss: any | undefined;
    three_point_shots_made: any | undefined;
    three_point_shots_miss: any | undefined;
    one_point_shot_ratio: any | undefined;
    two_point_shot_ratio: any | undefined;
    three_point_shot_ratio: any | undefined;
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
            this.minute_in_quarter = values.minute_in_quarter;
            this.total_sub_plays = values.total_sub_plays;
            this.total_shots = values.total_shots;
            this.one_point_shots_made = values.one_point_shots_made;
            this.one_point_shots_miss = values.one_point_shots_miss;
            this.two_point_shots_made = values.two_point_shots_made;
            this.two_point_shots_miss = values.two_point_shots_miss;
            this.three_point_shots_made = values.three_point_shots_made;
            this.three_point_shots_miss = values.three_point_shots_miss;
            this.one_point_shot_ratio = values.one_point_shot_ratio;
            this.two_point_shot_ratio = values.two_point_shot_ratio;
            this.three_point_shot_ratio = values.three_point_shot_ratio;
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
        return 'team_year_league_summary_minutes_quarter';
    }

    fromDbValues(values: any): TeamYearLeagueSummaryMinutesQuarter {
        const newTeamYearLeagueSummaryMinutesQuarter = new TeamYearLeagueSummaryMinutesQuarter();
        newTeamYearLeagueSummaryMinutesQuarter.team_id = values.team_id;
        newTeamYearLeagueSummaryMinutesQuarter.team_name = values.team_name;
        newTeamYearLeagueSummaryMinutesQuarter.league_year_id = values.league_year_id;
        newTeamYearLeagueSummaryMinutesQuarter.league_id = values.league_id;
        newTeamYearLeagueSummaryMinutesQuarter.league_name = values.league_name;
        newTeamYearLeagueSummaryMinutesQuarter.minute_in_quarter = values.minute_in_quarter;
        newTeamYearLeagueSummaryMinutesQuarter.total_sub_plays = values.total_sub_plays;
        newTeamYearLeagueSummaryMinutesQuarter.total_shots = values.total_shots;
        newTeamYearLeagueSummaryMinutesQuarter.one_point_shots_made = values.one_point_shots_made;
        newTeamYearLeagueSummaryMinutesQuarter.one_point_shots_miss = values.one_point_shots_miss;
        newTeamYearLeagueSummaryMinutesQuarter.two_point_shots_made = values.two_point_shots_made;
        newTeamYearLeagueSummaryMinutesQuarter.two_point_shots_miss = values.two_point_shots_miss;
        newTeamYearLeagueSummaryMinutesQuarter.three_point_shots_made = values.three_point_shots_made;
        newTeamYearLeagueSummaryMinutesQuarter.three_point_shots_miss = values.three_point_shots_miss;
        newTeamYearLeagueSummaryMinutesQuarter.one_point_shot_ratio = values.one_point_shot_ratio;
        newTeamYearLeagueSummaryMinutesQuarter.two_point_shot_ratio = values.two_point_shot_ratio;
        newTeamYearLeagueSummaryMinutesQuarter.three_point_shot_ratio = values.three_point_shot_ratio;
        newTeamYearLeagueSummaryMinutesQuarter.total_fouls = values.total_fouls;
        newTeamYearLeagueSummaryMinutesQuarter.total_infractions = values.total_infractions;
        newTeamYearLeagueSummaryMinutesQuarter.total_turnovers = values.total_turnovers;
        newTeamYearLeagueSummaryMinutesQuarter.total_defensive_rebounds = values.total_defensive_rebounds;
        newTeamYearLeagueSummaryMinutesQuarter.total_offensive_rebounds = values.total_offensive_rebounds;
        newTeamYearLeagueSummaryMinutesQuarter.total_assists = values.total_assists;
        newTeamYearLeagueSummaryMinutesQuarter.total_blocks = values.total_blocks;
        newTeamYearLeagueSummaryMinutesQuarter.total_timeouts = values.total_timeouts;
        return newTeamYearLeagueSummaryMinutesQuarter;
    }

    toDbValues(): any {
        return {
            team_id: this.team_id,
            team_name: this.team_name,
            league_year_id: this.league_year_id,
            league_id: this.league_id,
            league_name: this.league_name,
            minute_in_quarter: DbUtils.dateToEpoch(this.minute_in_quarter),
            total_sub_plays: DbUtils.dateToEpoch(this.total_sub_plays),
            total_shots: this.total_shots,
            one_point_shots_made: this.one_point_shots_made,
            one_point_shots_miss: this.one_point_shots_miss,
            two_point_shots_made: this.two_point_shots_made,
            two_point_shots_miss: this.two_point_shots_miss,
            three_point_shots_made: this.three_point_shots_made,
            three_point_shots_miss: this.three_point_shots_miss,
            one_point_shot_ratio: this.one_point_shot_ratio,
            two_point_shot_ratio: this.two_point_shot_ratio,
            three_point_shot_ratio: this.three_point_shot_ratio,
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
            minute_in_quarter: new FormControl(this.minute_in_quarter),
            total_sub_plays: new FormControl(this.total_sub_plays),
            total_shots: new FormControl(this.total_shots),
            one_point_shots_made: new FormControl(this.one_point_shots_made),
            one_point_shots_miss: new FormControl(this.one_point_shots_miss),
            two_point_shots_made: new FormControl(this.two_point_shots_made),
            two_point_shots_miss: new FormControl(this.two_point_shots_miss),
            three_point_shots_made: new FormControl(this.three_point_shots_made),
            three_point_shots_miss: new FormControl(this.three_point_shots_miss),
            one_point_shot_ratio: new FormControl(this.one_point_shot_ratio),
            two_point_shot_ratio: new FormControl(this.two_point_shot_ratio),
            three_point_shot_ratio: new FormControl(this.three_point_shot_ratio),
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
