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
import { GridstackModule, nodesCB } from 'gridstack/dist/angular';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { DbService } from '../../../shared/services/db.service';
import { Card } from '../../../shared/types/db/auto/Card';
import { Dashboard } from '../../../shared/types/db/auto/Dashboard';
import { DashboardCard } from '../../../shared/types/db/auto/DashboardCard';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';
import { CardComponent } from './card/card.component';
import { DashboardCardSettings } from '../../../shared/types/db/auto/DashboardCardSettings';

@Component({
    selector: 'app-dashboard-edit',
    templateUrl: './dashboard-edit.component.html',
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
        CardComponent,
    ]
})
export class DashboardEditComponent implements OnInit {

    dashboardId: number | undefined;
    dashboard: Dashboard | undefined;
    dashboardCards: DashboardCard[] = [];
    dashboardCardsSettings: DashboardCardSettings[] = [];
    cards: Card[] = [];
    dataLoading: boolean = false;

    gridstackOptions: GridStackOptions = {
        margin: 8,
        marginUnit: 'px',
    };
    gridstackItems: GridStackWidget[] = [];

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
            this.dashboard = await this._dbService.readUnique(new Dashboard(), { dashboard_id: this.dashboardId }) as Dashboard;
            this.cards = await this._dbService.readList(new Card(), { card_type_id: this.dashboard?.card_type_id }) as Card[];
            this.dashboardCards = await this._dbService.readList(new DashboardCard(), { dashboard_id: this.dashboardId }) as DashboardCard[];
            this.dashboardCardsSettings = await this._dbService.readList(new DashboardCardSettings(), { dashboard_id: this.dashboardId }) as DashboardCardSettings[];
        } else {
            this.dashboard = undefined;
            this.dashboardCards = [];
            this.dashboardCardsSettings = [];
        }
        this.loadGridstackItems();
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
    loadGridstackItems(): void {
        this.gridstackItems = [];
        for (const card of this.dashboardCards) {
            this.gridstackItems.push({
                id: card.dashboard_card_id?.toString(),
                x: card.x,
                y: card.y,
                w: card.width,
                h: card.height,
                minW: 2,
                minH: 2,
            });
        }
    }

    addCard(card: Card): void {
        const newDashboardCard = new DashboardCard();
        newDashboardCard.dashboard_id = this.dashboardId;
        newDashboardCard.card_id = card.card_id;
        newDashboardCard.width = 4;
        newDashboardCard.height = 3;
        this._dbService.create(newDashboardCard).subscribe((response: any) => {
            this.loadData();
        });
    }

    handleChange(event: nodesCB): void {
        for (const item of event.nodes) {
            const dashboardCard = this.getDashboardCardFromItem(item);
            dashboardCard.x = item.x;
            dashboardCard.y = item.y;
            dashboardCard.width = item.w;
            dashboardCard.height = item.h;
            this._dbService.update(dashboardCard).subscribe();
        }
        console.log(event);
    }

    updateItem(item: GridStackWidget, dashboardCard: DashboardCard): void {
        this.loadData();
    }

    deleteItem(item: GridStackWidget): void {
        const dashboardCard = this.getDashboardCardFromItem(item);
        this.dashboardCards = this.dashboardCards.filter(x => x.dashboard_card_id !== dashboardCard.dashboard_card_id);
        this.loadGridstackItems();
    }

    getDashboardCardFromItem(item: GridStackWidget): DashboardCard {
        const dashboardCard = this.dashboardCards.find(x => x.dashboard_card_id == +item.id!)!;
        return dashboardCard;
    }

    getDashboardCardSettingsFromItem(item: GridStackWidget): DashboardCardSettings[] {
        const dashboardCardSettings = this.dashboardCardsSettings.filter(x => x.dashboard_card_id == +item.id!)!;
        return dashboardCardSettings;
    }
    //#endregion

}
