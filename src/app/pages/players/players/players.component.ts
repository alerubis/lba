import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DbService } from '../../../shared/services/db.service';
import { Player } from '../../../shared/types/db/auto/Player';
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
    selector: 'app-players',
    templateUrl: './players.component.html',
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
    ]
})
export class PlayersComponent {

    players: Player[] = [];
    playersCount: number = 0;
    playersLoading: boolean = false;

    leaguesYears: LeagueYear[] = [];
    teams: Team[] = [];
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
        if (!this.selectedLeagueYearId && this.leaguesYears.length > 0) {
            this.selectedLeagueYearId = this.leaguesYears[0].id;
        }
        this.loadPlayers();
        this.dataLoading = false;
    }

    loadPlayers(): void {
        this.playersLoading = true;
        const where: any = {};
        this._dbService.readListPaginate(new Player(), where, this.paginator, this.sort).subscribe({
            next: response => {
                this.players = response.rows as Player[];
                this.playersCount = response.count;
                this.playersLoading = false;
                // this.scrollTop();
            },
            error: error => {
                this.players = [];
                this.playersCount = 0;
                this.playersLoading = false;
            }
        });
    }

    handleSortChange(): void {
        if (this.paginator) {
            this.paginator.pageIndex = 0;
        }
        this.loadPlayers();
    }

    handlePageChange(): void {
        this.loadPlayers();
    }

    getTeamFromId(id: number | undefined): Team | undefined {
        return this.teams.find(x => x.id === id);
    }

}
