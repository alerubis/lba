import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Card } from '../../../../../shared/types/db/auto/Card';
import { CardType } from '../../../../../shared/types/db/auto/CardType';
import { DashboardCard } from '../../../../../shared/types/db/auto/DashboardCard';

// echarts
import { RadarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { EChartsCoreOption } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
echarts.use([RadarChart, GridComponent, CanvasRenderer]);

export interface Settings {
    names: string[];
    values: number[];
}

@Component({
    selector: 'app-radar-card',
    templateUrl: './radar-card.component.html',
    standalone: true,
    imports: [
        NgxEchartsDirective
    ],
    providers: [
        provideEchartsCore({ echarts }),
    ]
})
export class RadarCardComponent implements OnInit, OnChanges {

    @Input({ required: true }) dashboardCard!: DashboardCard;
    @Input({ required: true }) card!: Card;

    chartOption: EChartsCoreOption = {};

    ngOnInit(): void {
        this.loadChartOption();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadChartOption();
    }

    loadChartOption(): void {
        const settings = (this.dashboardCard.settings || this.card.default_settings) as Settings;
        this.chartOption = {
            radar: {
                indicator: settings.names.map(x => ({ name: x })),
            },
            series: [
                {
                    name: 'Test',
                    type: 'radar',
                    data: [
                        {
                            value: settings.values,
                            name: 'Test'
                        }
                    ],
                    areaStyle: {
                        color: '#bfdbfe',
                    },
                    lineStyle: {
                        color: '#2563eb',
                        width: 2,
                    }
                }
            ]
        };
    }

}
