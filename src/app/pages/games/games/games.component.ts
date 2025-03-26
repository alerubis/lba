import { Component, ViewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        DatePipe,
        NgClass,
    ]
})
export class GamesComponent {

    games: Game[] = [];
    gamesCount: number = 0;
    gamesLoading: boolean = false;

    leaguesYears: LeagueYear[] = [];
    teams: Team[] = [];
    referees: Referee[] = [];
    dataLoading: boolean = false;

    selectedLeagueId: number | undefined;
    selectedLeagueYearId: number | undefined;
    selectedTeamId: number | undefined;

    @ViewChild(MatSort) sort: MatSort | undefined;
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

    constructor(
        private _dbService: DbService,
    ) {

    }

    ngOnInit(): void {
        this.loadData();
    }

    async loadData(): Promise<void> {
        this.dataLoading = true;
        this.leaguesYears = await this._dbService.readList(new LeagueYear()) as LeagueYear[];
        this.teams = await this._dbService.readList(new Team()) as Team[];
        this.referees = await this._dbService.readList(new Referee()) as Referee[];
        if (!this.selectedLeagueYearId && this.leaguesYears.length > 0) {
            this.selectedLeagueYearId = this.leaguesYears[0].id;
        }
        this.loadGames();
        this.dataLoading = false;
    }

    loadGames(): void {
        this.gamesLoading = true;
        const where: any = {};
        if (this.selectedLeagueId) {
            where['league_year_id'] = this.selectedLeagueId;
        }
        if (this.selectedTeamId) {
            where['OR'] = [
                { team_guest_id: this.selectedTeamId },
                { team_home_id: this.selectedTeamId },
            ]
        };
        this._dbService.readListPaginate(new Game(), where, this.paginator, this.sort).subscribe({
            next: response => {
                this.games = response.rows as Game[];
                this.gamesCount = response.count;
                this.gamesLoading = false;
                // this.scrollTop();
            },
            error: error => {
                this.games = [];
                this.gamesCount = 0;
                this.gamesLoading = false;
            }
        });
    }

    handleSortChange(): void {
        if (this.paginator) {
            this.paginator.pageIndex = 0;
        }
        this.loadGames();
    }

    handlePageChange(): void {
        this.loadGames();
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
