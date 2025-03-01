import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GridStackOptions, GridStackWidget } from 'gridstack';
import { GridstackModule } from 'gridstack/dist/angular';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { DbService } from '../../../shared/services/db.service';
import { Card } from '../../../shared/types/db/auto/Card';
import { CardType } from '../../../shared/types/db/auto/CardType';
import { Dashboard } from '../../../shared/types/db/auto/Dashboard';
import { DashboardCard } from '../../../shared/types/db/auto/DashboardCard';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [
        BreadcrumbComponent,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatTabsModule,
        MatTooltipModule,
        GridstackModule,
    ]
})
export class DashboardComponent implements OnInit {

    dashboardId: number | undefined;
    dashboard: Dashboard | undefined;
    dashboardCards: DashboardCard[] = [];
    cards: Card[] = [];
    cardTypes: CardType[] = [];
    dataLoading: boolean = false;

    gridstackOptions: GridStackOptions = {
        margin: 8,
        marginUnit: 'px',
    };
    gridstackItems: GridStackWidget[] = [
        { x: 0, y: 0, w: 4, h: 3, minW: 2, minH: 2, id: '1' },
        { x: 4, y: 0, w: 4, h: 3, minW: 2, minH: 2, id: '2' },
        { x: 0, y: 4, w: 4, h: 3, minW: 2, minH: 2, id: '3' },
    ];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _dbService: DbService,
        private _matDialog: MatDialog,
        private _router: Router,
    ) {

    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const idFromParams = params.get('id');
            if (idFromParams) {
                this.dashboardId = +idFromParams;
            }
            this.loadData();
        });
    }

    //#region Dashboard
    async loadData(): Promise<void> {
        this.dataLoading = true;
        if (this.dashboardId) {
            this.dashboard = await this._dbService.readFromId(new Dashboard(), this.dashboardId) as Dashboard;
            this.dashboardCards = await this._dbService.readList(new DashboardCard(), { dashboard_id: this.dashboardId }) as DashboardCard[];
        } else {
            this.dashboard = undefined;
            this.dashboardCards = [];
        }
        this.cards = await this._dbService.readList(new Card()) as Card[];
        this.cardTypes = await this._dbService.readList(new CardType()) as CardType[];
        this.dataLoading = false;
    }

    updateDashboard(dashboard: Dashboard | undefined): void {
        if (!dashboard) {
            return;
        }

        const dialogRef = this._matDialog.open(DashboardDialogComponent, {
            width: '90%',
            maxWidth: '640px',
            data: {
                action: 'update',
                dashboard: dashboard,
            },
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
                if (response === 'delete') {
                    this._router.navigate(['/pages/dashboards/']);
                } else {
                    this.loadData();
                }
            }
        });
    }
    //#endregion

    //#region Cards
    addCard(card: Card): void {
        this.gridstackItems.push({ w: 4, h: 3 });
    }

    deleteCard(index: number): void {
        this.gridstackItems.splice(index, 1);
    }
    //#endregion

}
