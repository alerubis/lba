import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { DbService } from '../../../../../../shared/services/db.service';
import { VTeamYearLeagueSummaryMinutesGame } from '../../../../../../shared/types/db/auto/VTeamYearLeagueSummaryMinutesGame';
import { VTeamYearLeagueSummaryMinutesQuarter } from '../../../../../../shared/types/db/auto/VTeamYearLeagueSummaryMinutesQuarter';
import { VTeamYearLeagueSummarySecondsPlay } from '../../../../../../shared/types/db/auto/VTeamYearLeagueSummarySecondsPlay';
import { BaseCardComponent } from '../../base-card/base-card.component';

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
export class RadarCardComponent extends BaseCardComponent {

    chartOption: EChartsCoreOption = {};

    dati: any[] = [];

    constructor(private _dbService: DbService) {
        super();
    }

    override async loadChartOption(): Promise<void> {

        const x = this.dashboardCardSettings.find((setting) => setting.setting_id === 'X')?.value;
        const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
        // const filter = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Filter')?.value;
        const filter = 'team';

        this.dati = [];
        if (x === "team_year_league_summary_seconds_play"){
            if (filter === "team"){
                this.dati = await this._dbService.readList(new VTeamYearLeagueSummarySecondsPlay(), { team_id: 1, league_year_id: 1 }) as VTeamYearLeagueSummarySecondsPlay[];
            }
        } else if (x === "team_year_league_summary_minutes_quart"){
            if (filter === "team"){
                this.dati = await this._dbService.readList(new VTeamYearLeagueSummaryMinutesQuarter(), { team_id: 1, league_year_id: 1 }) as VTeamYearLeagueSummaryMinutesQuarter[];
            }
        } else if (x === "team_year_league_summary_minutes_game"){
            if (filter === "team"){
                this.dati = await this._dbService.readList(new VTeamYearLeagueSummaryMinutesGame(), { team_id: 1, league_year_id: 1 }) as VTeamYearLeagueSummaryMinutesGame[];
            }
        }

        if (x === 'team_year_league_summary_seconds_play') {
            const dati = this.dati.map(x=>{+x.second_in_play+1; x[y]})
            this.chartOption = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    name: 'Seconds Play',
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
                    data: ['Squadra A'],
                    top: 'top'
                },
                series: [
                    {
                        name: 'Squadra A',
                        type: 'line',
                        smooth: 0.5,
                        symbol: 'none',
                        lineStyle: {
                            color: '#1f77b4',
                            width: 3
                        },
                        areaStyle: { opacity: 0.5 },
                        data: [
                            dati
                        ]
                    }
                ]
            };

        } else if (x === 'team_year_league_summary_minutes_quarter') {
            const dati = this.dati.map(x=>{+x.minute_in_quarter+1; x[y]})

            this.chartOption = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    name: 'Minuti di gioco',
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
                        { gt: 0, lt: 10, color: 'rgba(60, 179, 113, 0.4)' },
                        { gt: 10, lt: 16, color: 'rgba(255, 165, 0, 0.4)' },
                        { gt: 16, lt: 20, color: 'rgba(255, 0, 0, 0.4)' }
                    ]
                },
                legend: {
                    data: ['Squadra A'],
                    top: 'top'
                },
                series: [
                    {
                        name: 'Squadra A',
                        type: 'line',
                        smooth: 0.5,
                        symbol: 'none',
                        lineStyle: {
                            color: '#1f77b4',
                            width: 3
                        },
                        areaStyle: { opacity: 0.5 },
                        data: [
                            dati
                        ]
                    },
                ]
            };

        } else {
            const dati = this.dati.map(x=>{+x.minute_in_game+1; x[y]})

            this.chartOption = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    name: 'Minuti di gioco',
                    nameLocation: 'middle',
                    nameGap: 25,
                    axisLabel: {
                        interval: 2
                    }
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
                        { gt: 0, lt: 20, color: 'rgba(60, 179, 113, 0.4)' },
                        { gt: 20, lt: 40, color: 'rgba(255, 165, 0, 0.4)' },
                        { gt: 40, lt: 60, color: 'rgba(255, 0, 0, 0.4)' },
                        { gt: 60, lt: 80, color: 'rgba(128, 0, 128, 0.4)' }
                    ]
                },
                legend: {
                    data: ['Squadra A'],
                    top: 'top'
                },
                series: [
                    {
                        name: 'Squadra A',
                        type: 'line',
                        smooth: 0.5,
                        symbol: 'none',
                        lineStyle: {
                            color: '#1f77b4',
                            width: 3
                        },
                        areaStyle: { opacity: 0.5 },
                        data: [
                            dati
                        ]
                    }
                ]
            };


        }

    }

}


