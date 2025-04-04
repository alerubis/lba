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
    @Input() teamId: number | undefined;

    constructor() {

    }

    //#region Table
    ngOnInit(): void {
        this.loadChartOption();
    }

    ngOnChanges(changes: SimpleChanges): void {
        let shouldReload: boolean = false;
        const changesToDetect = ['dashboardCardSettings', 'gameId', 'gameIds', 'playerId', 'teamId'];
        for (const changeId of changesToDetect) {
            const changeToDetect = changes[changeId];
            if (changeToDetect) {
                if (!changeToDetect.isFirstChange()) {
                    const previousValue = changeToDetect.previousValue;
                    const currentValue = changeToDetect.currentValue;
                    if (!_.isEqual(previousValue, currentValue)) {
                        shouldReload = true;
                        console.log('è cambiato', changeId, 'da', previousValue, 'a', currentValue);
                    }
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
