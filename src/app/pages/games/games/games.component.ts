import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DbService } from '../../../shared/services/db.service';
import { Game } from '../../../shared/types/db/auto/Game';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { League } from '../../../shared/types/db/auto/League';
import { LeagueYear } from '../../../shared/types/db/auto/LeagueYear';
import { Team } from '../../../shared/types/db/auto/Team';
import { DatePipe, NgClass } from '@angular/common';
import { Referee } from '../../../shared/types/db/auto/Referee';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        RouterLink,
        MatProgressBarModule,
        BreadcrumbComponent,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        DatePipe,
        NgClass,
    ]
})
export class GamesComponent {

    games: Game[] = [];
    leagues: League[] = [];
    leaguesYears: LeagueYear[] = [];
    teams: Team[] = [];
    referees: Referee[] = [];
    dataLoading: boolean = false;

    selectedLeagueId: number | undefined;
    selectedLeagueYearId: number | undefined;
    selectedTeamId: number | undefined;

    constructor(
        private _dbService: DbService,
    ) {

    }

    ngOnInit(): void {
        this.loadData();
    }

    async loadData(): Promise<void> {
        this.dataLoading = true;
        this.games = await this._dbService.readList(new Game()) as Game[];
        this.leagues = await this._dbService.readList(new League()) as League[];
        this.leaguesYears = await this._dbService.readList(new LeagueYear()) as LeagueYear[];
        this.teams = await this._dbService.readList(new Team()) as Team[];
        this.referees = await this._dbService.readList(new Referee()) as Referee[];
        if (!this.selectedLeagueId && this.leagues.length > 0) {
            this.selectedLeagueId = this.leagues[0].id;
        }
        if (!this.selectedLeagueYearId && this.leaguesYears.length > 0) {
            this.selectedLeagueYearId = this.leaguesYears[0].id;
        }
        this.dataLoading = false;
    }

    getTeamFromId(id: number | undefined): Team | undefined {
        return this.teams.find(x => x.id === id);
    }

    getRefereeFullName(id: number | undefined): string {
        const referee = this.referees.find(x => x.id === id);
        if (referee) {
            return referee.name + ' ' + referee.surname;
        }
        return '';
    }

}
