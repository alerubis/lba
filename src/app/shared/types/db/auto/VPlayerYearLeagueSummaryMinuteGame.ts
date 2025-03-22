import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VPlayerYearLeagueSummaryMinuteGame implements Table {

    player_id: number | undefined;
    player_name: string | undefined;
    league_year_id: number | undefined;
    league_id: number | undefined;
    league_name: string | undefined;
    minute_in_game: number | undefined;
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
            this.player_id = values.player_id;
            this.player_name = values.player_name;
            this.league_year_id = values.league_year_id;
            this.league_id = values.league_id;
            this.league_name = values.league_name;
            this.minute_in_game = values.minute_in_game;
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
        return 'v_player_year_league_summary_minute_game';
    }

    fromDbValues(values: any): VPlayerYearLeagueSummaryMinuteGame {
        const newVPlayerYearLeagueSummaryMinuteGame = new VPlayerYearLeagueSummaryMinuteGame();
        newVPlayerYearLeagueSummaryMinuteGame.player_id = values.player_id;
        newVPlayerYearLeagueSummaryMinuteGame.player_name = values.player_name;
        newVPlayerYearLeagueSummaryMinuteGame.league_year_id = values.league_year_id;
        newVPlayerYearLeagueSummaryMinuteGame.league_id = values.league_id;
        newVPlayerYearLeagueSummaryMinuteGame.league_name = values.league_name;
        newVPlayerYearLeagueSummaryMinuteGame.minute_in_game = values.minute_in_game;
        newVPlayerYearLeagueSummaryMinuteGame.total_sub_plays = values.total_sub_plays;
        newVPlayerYearLeagueSummaryMinuteGame.total_shots = values.total_shots;
        newVPlayerYearLeagueSummaryMinuteGame.one_point_shots_made = values.one_point_shots_made;
        newVPlayerYearLeagueSummaryMinuteGame.one_point_shots_miss = values.one_point_shots_miss;
        newVPlayerYearLeagueSummaryMinuteGame.two_point_shots_made = values.two_point_shots_made;
        newVPlayerYearLeagueSummaryMinuteGame.two_point_shots_miss = values.two_point_shots_miss;
        newVPlayerYearLeagueSummaryMinuteGame.three_point_shots_made = values.three_point_shots_made;
        newVPlayerYearLeagueSummaryMinuteGame.three_point_shots_miss = values.three_point_shots_miss;
        newVPlayerYearLeagueSummaryMinuteGame.one_point_shot_ratio = values.one_point_shot_ratio;
        newVPlayerYearLeagueSummaryMinuteGame.two_point_shot_ratio = values.two_point_shot_ratio;
        newVPlayerYearLeagueSummaryMinuteGame.three_point_shot_ratio = values.three_point_shot_ratio;
        newVPlayerYearLeagueSummaryMinuteGame.total_fouls = values.total_fouls;
        newVPlayerYearLeagueSummaryMinuteGame.total_infractions = values.total_infractions;
        newVPlayerYearLeagueSummaryMinuteGame.total_turnovers = values.total_turnovers;
        newVPlayerYearLeagueSummaryMinuteGame.total_defensive_rebounds = values.total_defensive_rebounds;
        newVPlayerYearLeagueSummaryMinuteGame.total_offensive_rebounds = values.total_offensive_rebounds;
        newVPlayerYearLeagueSummaryMinuteGame.total_assists = values.total_assists;
        newVPlayerYearLeagueSummaryMinuteGame.total_blocks = values.total_blocks;
        newVPlayerYearLeagueSummaryMinuteGame.total_timeouts = values.total_timeouts;
        return newVPlayerYearLeagueSummaryMinuteGame;
    }

    toDbValues(): any {
        return {
            player_id: this.player_id,
            player_name: this.player_name,
            league_year_id: this.league_year_id,
            league_id: this.league_id,
            league_name: this.league_name,
            minute_in_game: this.minute_in_game,
            total_sub_plays: this.total_sub_plays,
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
            player_id: new FormControl(this.player_id),
            player_name: new FormControl(this.player_name),
            league_year_id: new FormControl(this.league_year_id),
            league_id: new FormControl(this.league_id),
            league_name: new FormControl(this.league_name),
            minute_in_game: new FormControl(this.minute_in_game),
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
