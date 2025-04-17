import { FormControl, Validators } from '@angular/forms';
import { DbUtils } from '../DbUtils';
import { Table } from '../Table';

export class VTeamGameLineupMinutes implements Table {

    game_id: number | undefined;
    team_id: number | undefined;
    player1_id: number | undefined;
    player2_id: number | undefined;
    player3_id: number | undefined;
    player4_id: number | undefined;
    player5_id: number | undefined;
    minuti_giocati: any | undefined;

    constructor(values?: any) {
        if (values) {
            this.game_id = values.game_id;
            this.team_id = values.team_id;
            this.player1_id = values.player1_id;
            this.player2_id = values.player2_id;
            this.player3_id = values.player3_id;
            this.player4_id = values.player4_id;
            this.player5_id = values.player5_id;
            this.minuti_giocati = values.minuti_giocati;
        }
    }

    getName(): string {
        return 'v_team_game_lineup_minutes';
    }

    fromDbValues(values: any): VTeamGameLineupMinutes {
        const newVTeamGameLineupMinutes = new VTeamGameLineupMinutes();
        newVTeamGameLineupMinutes.game_id = values.game_id;
        newVTeamGameLineupMinutes.team_id = values.team_id;
        newVTeamGameLineupMinutes.player1_id = values.player1_id;
        newVTeamGameLineupMinutes.player2_id = values.player2_id;
        newVTeamGameLineupMinutes.player3_id = values.player3_id;
        newVTeamGameLineupMinutes.player4_id = values.player4_id;
        newVTeamGameLineupMinutes.player5_id = values.player5_id;
        newVTeamGameLineupMinutes.minuti_giocati = values.minuti_giocati;
        return newVTeamGameLineupMinutes;
    }

    toDbValues(): any {
        return {
            game_id: this.game_id,
            team_id: this.team_id,
            player1_id: this.player1_id,
            player2_id: this.player2_id,
            player3_id: this.player3_id,
            player4_id: this.player4_id,
            player5_id: this.player5_id,
            minuti_giocati: this.minuti_giocati,
        }
    }

    toFormGroup(): any {
        return {
            game_id: new FormControl(this.game_id),
            team_id: new FormControl(this.team_id),
            player1_id: new FormControl(this.player1_id),
            player2_id: new FormControl(this.player2_id),
            player3_id: new FormControl(this.player3_id),
            player4_id: new FormControl(this.player4_id),
            player5_id: new FormControl(this.player5_id),
            minuti_giocati: new FormControl(this.minuti_giocati),
        }
    }

}
