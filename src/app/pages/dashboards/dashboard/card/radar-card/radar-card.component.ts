import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardCard } from '../../../../../shared/types/db/auto/DashboardCard';

// echarts
import { RadarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { EChartsCoreOption } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { DashboardCardSettings } from '../../../../../shared/types/db/auto/DashboardCardSettings';
echarts.use([RadarChart, GridComponent, CanvasRenderer]);

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
    @Input({ required: true }) dashboardCardSettings!: DashboardCardSettings[];

    chartOption: EChartsCoreOption = {};

    ngOnInit(): void {
        this.loadChartOption();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadChartOption();
    }

    loadChartOption(): void {
        this.chartOption = {
            radar: {
                indicator: [{name: '0'}],
            },
            series: [
                {
                    name: 'Test',
                    type: 'radar',
                    data: [
                        {
                            value: [1, 2],
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
