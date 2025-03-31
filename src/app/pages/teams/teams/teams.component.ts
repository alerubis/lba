import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DbService } from '../../../shared/services/db.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { League } from '../../../shared/types/db/auto/League';
import { LeagueYear } from '../../../shared/types/db/auto/LeagueYear';
import { DatePipe, NgClass } from '@angular/common';
import { Referee } from '../../../shared/types/db/auto/Referee';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Team } from '../../../shared/types/db/auto/Team';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
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
    ]
})
export class TeamsComponent {

    teams: Team[] = [];
    teamsCount: number = 0;
    teamsLoading: boolean = false;

    leaguesYears: LeagueYear[] = [];
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
        if (!this.selectedLeagueYearId && this.leaguesYears.length > 0) {
            this.selectedLeagueYearId = this.leaguesYears[0].id;
        }
        this.loadTeams();
        this.dataLoading = false;
    }

    loadTeams(): void {
        this.teamsLoading = true;
        const where: any = {};
        this._dbService.readListPaginate(new Team(), where, this.paginator, this.sort).subscribe({
            next: response => {
                this.teams = response.rows as Team[];
                this.teamsCount = response.count;
                this.teamsLoading = false;
                // this.scrollTop();
            },
            error: error => {
                this.teams = [];
                this.teamsCount = 0;
                this.teamsLoading = false;
            }
        });
    }

    handleSortChange(): void {
        if (this.paginator) {
            this.paginator.pageIndex = 0;
        }
        this.loadTeams();
    }

    handlePageChange(): void {
        this.loadTeams();
    }

}
