import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardCard } from '../../../../../shared/types/db/auto/DashboardCard';
import { DashboardCardSettings } from '../../../../../shared/types/db/auto/DashboardCardSettings';

@Component({
    selector: 'app-base-card',
    templateUrl: './base-card.component.html',
    standalone: true,
})
export class BaseCardComponent implements OnInit, OnChanges {

    @Input({ required: true }) dashboardCard!: DashboardCard;
    @Input({ required: true }) dashboardCardSettings!: DashboardCardSettings[];

    ngOnInit(): void {
        this.loadChartOption();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadChartOption();
    }

    loadChartOption(): void {

    }

}
