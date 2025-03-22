import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GridStackOptions, GridStackWidget } from 'gridstack';
import { GridstackModule } from 'gridstack/dist/angular';
import { DbService } from '../../../shared/services/db.service';
import { Dashboard } from '../../../shared/types/db/auto/Dashboard';
import { DashboardCard } from '../../../shared/types/db/auto/DashboardCard';
import { DashboardCardSettings } from '../../../shared/types/db/auto/DashboardCardSettings';
import { CardComponent } from './card/card.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [
        GridstackModule,
        CardComponent,
    ]
})
export class DashboardComponent implements OnInit, OnChanges {

    @Input({ required: true }) dashboardId!: number;
    @Input() gameId: number | undefined;
    @Input() playerId: number | undefined;

    dashboard: Dashboard | undefined;
    dashboardCards: DashboardCard[] = [];
    dashboardCardsSettings: DashboardCardSettings[] = [];
    dataLoading: boolean = false;

    gridstackOptions: GridStackOptions = {
        margin: 8,
        marginUnit: 'px',
    };
    gridstackItems: GridStackWidget[] = [];

    constructor(
        private _dbService: DbService,
    ) {

    }

    ngOnInit(): void {
        this.loadData();
    }

    ngOnChanges(changes: SimpleChanges): void {
        let shouldReload: boolean = false;
        const dashboardId = changes['dashboardId'];
        if (dashboardId) {
            if (!dashboardId.isFirstChange()) {
                const currentValue = dashboardId.currentValue;
                const previousValue = dashboardId.previousValue;
                if (currentValue != previousValue) {
                    shouldReload = true;
                }
            }
        }
        if (shouldReload) {
            this.loadData();
        }
    }

    async loadData(): Promise<void> {
        this.dataLoading = true;
        if (this.dashboardId) {
            this.dashboard = await this._dbService.readUnique(new Dashboard(), { dashboard_id: this.dashboardId }) as Dashboard;
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

    getDashboardCardFromItem(item: GridStackWidget): DashboardCard {
        const dashboardCard = this.dashboardCards.find(x => x.dashboard_card_id == +item.id!)!;
        return dashboardCard;
    }

    getDashboardCardSettingsFromItem(item: GridStackWidget): DashboardCardSettings[] {
        const dashboardCardSettings = this.dashboardCardsSettings.filter(x => x.dashboard_card_id == +item.id!)!;
        return dashboardCardSettings;
    }

}
