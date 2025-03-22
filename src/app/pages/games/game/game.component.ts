import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DbService } from '../../../shared/services/db.service';
import { Game } from '../../../shared/types/db/auto/Game';
import { DashboardComponent } from '../../dashboards/dashboard/dashboard.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Dashboard } from '../../../shared/types/db/auto/Dashboard';
import { FormsModule } from '@angular/forms';
import { Team } from '../../../shared/types/db/auto/Team';
import { DatePipe, NgClass } from '@angular/common';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        DashboardComponent,
        BreadcrumbComponent,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        NgClass,
        DatePipe,
    ]
})
export class GameComponent {

    cardId: number | undefined;
    game: Game | undefined;
    dashboards: Dashboard[] = [];
    teams: Team[] = [];
    dataLoading: boolean = false;

    selectedDashboardId: number | undefined;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _dbService: DbService,
    ) {

    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const idFromParams = params.get('id');
            if (idFromParams) {
                this.cardId = +idFromParams;
            }
            this.loadData();
        });
    }

    async loadData(): Promise<void> {
        this.dataLoading = true;
        if (this.cardId) {
            this.game = await this._dbService.readUnique(new Game(), { id: this.cardId }) as Game;
        } else {
            this.game = undefined;
        }
        this.dashboards = await this._dbService.readList(new Dashboard()) as Dashboard[];
        this.teams = await this._dbService.readList(new Team()) as Team[];
        if (!this.selectedDashboardId && this.dashboards.length > 0) {
            this.selectedDashboardId = this.dashboards[0].dashboard_id;
        }
        this.dataLoading = false;
    }

    getTeamFromId(id: number | undefined): Team | undefined {
        return this.teams.find(x => x.id === id);
    }

}
