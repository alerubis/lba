import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { DbService } from '../../../../../../shared/services/db.service';
import { VTeamYearLeagueSummaryMinutesGame } from '../../../../../../shared/types/db/auto/VTeamYearLeagueSummaryMinutesGame';
import { VTeamYearLeagueSummaryMinutesQuarter } from '../../../../../../shared/types/db/auto/VTeamYearLeagueSummaryMinutesQuarter';
import { VTeamYearLeagueSummarySecondsPlay } from '../../../../../../shared/types/db/auto/VTeamYearLeagueSummarySecondsPlay';
import { BaseCardComponent } from '../../base-card/base-card.component';
import _ from 'lodash';
import { VPlayerYearLeagueSummarySecondsPlay } from '../../../../../../shared/types/db/auto/VPlayerYearLeagueSummarySecondsPlay';

@Component({
    selector: 'line-quarter-player-card',
    templateUrl: './line-quarter-player-card.component.html',
    standalone: true,
    imports: [
        NgxEchartsDirective
    ],
    providers: [
        provideEchartsCore({ echarts }),
    ]
})
export class LinePlayPlayerCardComponent extends BaseCardComponent {

    chartOption: EChartsCoreOption = {};

    dati: any[] = [];

    constructor(private _dbService: DbService) {
        super();
    }

    override async loadChartOption(): Promise<void> {

        const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;

        this.dati = [];
        this.dati = await this._dbService.readList(new VTeamYearLeagueSummaryMinutesQuarter(), { team_id: 1, league_year_id: 1 }) as VTeamYearLeagueSummaryMinutesQuarter[];
        this.dati = _.orderBy(this.dati, a=>+a.minute_in_quarter);

        const dati = this.dati.map(a=>[+a.minute_in_quarter+1, a[y]])
        this.chartOption = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                name: 'Minutes Quarter',
                nameLocation: 'middle',
                nameGap: 25
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '30%'],
                name: y,
                nameLocation: 'middle',
                nameGap: 50
            },
            visualMap: {
                type: 'piecewise',
                show: false,
                dimension: 0,
                seriesIndex: [0, 1],
                pieces: [
                    { gt: 0, lt: 5, color: 'rgba(60, 179, 113, 0.4)' },
                    { gt: 5, lt: 8, color: 'rgba(255, 165, 0, 0.4)' },
                    { gt: 8, lt: 10, color: 'rgba(255, 0, 0, 0.4)' }
                ]
            },
            legend: {
                data: ['Giocatore A'],
                top: 'top'
            },
            series: [
                {
                    name: 'Giocatore A',
                    type: 'line',
                    smooth: 0.5,
                    symbol: 'none',
                    lineStyle: {
                        color: '#1f77b4',
                        width: 3
                    },
                    areaStyle: { opacity: 0.5 },
                    data: dati
                }
            ]
        };


    }

}