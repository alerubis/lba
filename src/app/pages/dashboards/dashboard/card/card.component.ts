import { Component, Input, OnInit } from '@angular/core';
import { DbService } from '../../../../shared/services/db.service';
import { Card } from '../../../../shared/types/db/auto/Card';
import { CardType } from '../../../../shared/types/db/auto/CardType';
import { DashboardCard } from '../../../../shared/types/db/auto/DashboardCard';

// echarts
import { RadarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { EChartsCoreOption } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
echarts.use([RadarChart, GridComponent, CanvasRenderer]);

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    standalone: true,
    imports: [
        NgxEchartsDirective
    ],
    providers: [
        provideEchartsCore({ echarts }),
    ]
})
export class CardComponent implements OnInit {

    @Input({ required: true }) dashboardCard!: DashboardCard;
    @Input({ required: true }) card!: Card;
    @Input({ required: true }) cardType!: CardType;

    chartOption: EChartsCoreOption = {};

    constructor(
        private _dbService: DbService,
    ) {

    }
    ngOnInit(): void {
        this.chartOption = {
            radar: {
                indicator: this.card.default_settings.names.map((x: any) => ({ name: x })),
            },
            series: [
                {
                    name: 'Test',
                    type: 'radar',
                    data: [
                        {
                            value: [90, 70, 85, 60, 90],
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
