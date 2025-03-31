import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardCard } from '../../../../../shared/types/db/auto/DashboardCard';
import { DashboardCardSettings } from '../../../../../shared/types/db/auto/DashboardCardSettings';
import _ from 'lodash';

@Component({
    selector: 'app-base-card',
    templateUrl: './base-card.component.html',
    standalone: true,
})
export class BaseCardComponent implements OnInit, OnChanges {

    @Input({ required: true }) dashboardCard!: DashboardCard;
    @Input({ required: true }) dashboardCardSettings!: DashboardCardSettings[];
    @Input() gameId: number | undefined;
    @Input() gameIds: number[] | undefined;
    @Input() playerId: number | undefined;

    constructor() {

    }

    //#region Table
    ngOnInit(): void {
        this.loadChartOption();
    }

    ngOnChanges(changes: SimpleChanges): void {
        let shouldReload: boolean = false;
        const changesDashboardSettings = changes['dashboardCardSettings'];
        if (changesDashboardSettings) {
            if (!changesDashboardSettings.isFirstChange()) {
                const previousValue = changesDashboardSettings.previousValue;
                const currentValue = changesDashboardSettings.currentValue;
                if (!_.isEqual(previousValue, currentValue)) {
                    shouldReload = true;
                }
            }
        }
        if (shouldReload) {
            this.loadChartOption();
        }
    }

    loadChartOption(): void {

    }

}
