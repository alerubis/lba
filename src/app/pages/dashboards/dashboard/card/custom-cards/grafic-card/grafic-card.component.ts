import { Component, Input } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { DbService } from '../../../../../../shared/services/db.service';
import { BaseCardComponent } from '../../base-card/base-card.component';
import _ from 'lodash';
import { Player } from '../../../../../../shared/types/db/auto/Player';
import { Game } from '../../../../../../shared/types/db/auto/Game';

@Component({
    selector: 'grafic-card',
    templateUrl: './grafic-card.component.html',
    standalone: true,
    imports: [
        NgxEchartsDirective
    ],
    providers: [
        provideEchartsCore({ echarts }),
    ]
})
export class GraficCardComponent extends BaseCardComponent {

    chartOption: EChartsCoreOption = {};
    playersSummary: VPlayerYearLeagueSummary[] = [];
    players: Player[] = [];
    game: Game | undefined;
    stats: string[] = [];

    constructor(private _dbService: DbService) {
        super();
    }

    override async loadChartOption(): Promise<void> {
        this.players = await this._dbService.readList(new Player()) as Player[];
        this.game = await this._dbService.readUnique(new Game(), { game_id: this.gameId }) as Game;
        this.playersSummary  = await this._dbService.readList(new VPlayerYearLeagueSummary()) as VPlayerYearLeagueSummary[];
        this.playersSummary  = this.playersSummary.slice(0, 10);
        this.stats = this.dashboardCardSettings.find((setting) => setting.setting_id === 'STAT')?.value;
        const team_id = this.game.team_home_id
        if (this.dashboardCard.card_id === 'CALENDAR_PLAYER' || this.dashboardCard.card_id === 'CALENDAR_TEAM') {
            const data: [string, number][] = [
                ['2025-01-05', 20],
                ['2025-01-08', 10],
                ['2025-01-11', 15],
                ['2025-01-15', 30],
                ['2025-01-19', 15],
                ['2025-01-21', 20],
                ['2025-01-24', 12],
                ['2025-01-26', 18],
                ['2025-01-29', 10],
                ['2025-02-01', 25],
                ['2025-02-05', 20],
                ['2025-02-09', 10],
                ['2025-02-12', 15],
                ['2025-02-16', 30],
                ['2025-02-20', 15],
                ['2025-02-22', 20],
                ['2025-02-25', 12],
                ['2025-02-27', 18],
                ['2025-03-02', 10],
                ['2025-03-04', 25],
                ['2025-03-09', 10],
                ['2025-03-12', 15],
                ['2025-03-16', 30],
                ['2025-03-20', 15],
                ['2025-03-22', 20],
                ['2025-03-25', 12],
                ['2025-03-27', 18],
                ['2025-03-29', 12],
                ['2025-03-31', 18]
            ];
            this.chartOption = {
                tooltip: {
                    position: 'top'
                },

                calendar: {
                    range: ['2025-01-01', '2025-03-31'],
                    orient: 'vertical',
                    left: 35,
                    yearLabel: {
                        margin: 40
                    },
                    monthLabel: {
                        nameMap: 'en',  // o 'cn', oppure un array personalizzato
                        margin: 10,
                        position: 'start'  // Mette il nome del mese all’inizio della riga
                    },
                    dayLabel: {
                        firstDay: 1,
                        nameMap: 'en'
                    },
                    cellSize: 30
                },

                series: {
                    type: 'effectScatter',
                    coordinateSystem: 'calendar',
                    calendarIndex: 0,
                    symbolSize: function (val: any) {
                        return val[1] / 2;
                    },
                    data: data
                }
            };
        }
        else if (this.dashboardCard.card_id === 'LINE_GAME_GAME' || this.dashboardCard.card_id === 'LINE_GAME_PLAYER' || this.dashboardCard.card_id === 'LINE_GAME_TEAM') {
            let dati: any[] = [];
            const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
            dati = await this._dbService.readList(new VTeamYearLeagueSummaryMinutesGame(), { team_id: team_id, league_year_id: 1 }) as VTeamYearLeagueSummaryMinutesGame[];
            dati = _.orderBy(dati, a => +a.minute_in_game);
            dati = dati.map(a => [+a.minute_in_game, a[y]])
            this.chartOption = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    name: 'Minutes Game',
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
                        { gt: 10, lt: 20, color: 'rgba(255, 165, 0, 0.4)' },
                        { gt: 20, lt: 30, color: 'rgba(255, 0, 0, 0.4)' },
                        { gt: 30, lt: 40, color: 'rgba(255, 0, 165, 0.4)' }
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
                        data: dati
                    }
                ]
            };
        }
        else if (this.dashboardCard.card_id === 'LINE_QUARTER_GAME' || this.dashboardCard.card_id === 'LINE_QUARTER_PLAYER' || this.dashboardCard.card_id === 'LINE_QUARTER_TEAM') {
            let dati: any[] = [];
            const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
            dati = await this._dbService.readList(new VTeamYearLeagueSummaryMinutesQuarter(), { team_id: team_id, league_year_id: 1 }) as VTeamYearLeagueSummaryMinutesQuarter[];
            dati = _.orderBy(dati, a => +a.minute_in_quarter);
            dati = dati.map(a => [+a.minute_in_quarter + 1, a[y]])
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
                        data: dati
                    }
                ]
            };
        }
        else if (this.dashboardCard.card_id === 'LINE_PLAY_GAME' || this.dashboardCard.card_id === 'LINE_PLAY_PLAYER' || this.dashboardCard.card_id === 'LINE_PLAY_TEAM') {
            let dati: any[] = [];
            const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
            dati = await this._dbService.readList(new VTeamYearLeagueSummarySecondsPlay(), { team_id: team_id, league_year_id: 1 }) as VTeamYearLeagueSummarySecondsPlay[];
            dati = _.orderBy(dati, a => +a.second_in_play);
            dati = dati.map(a => [+a.second_in_play, a[y]])
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
                        { gt: 0, lt: 14, color: 'rgba(60, 179, 113, 0.4)' },
                        { gt: 14, lt: 20, color: 'rgba(255, 165, 0, 0.4)' },
                        { gt: 20, lt: 24, color: 'rgba(255, 0, 0, 0.4)' }
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
                        data: dati
                    }
                ]
            };
        }
        else if (this.dashboardCard.card_id === 'LINE_MINUTES_PLAYED') {
            let dati: any[] = [];
            const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
            dati = await this._dbService.readList(new VTeamYearLeagueSummaryMinutesQuarter(), { team_id: team_id, league_year_id: 1 }) as VTeamYearLeagueSummaryMinutesQuarter[];
            dati = _.orderBy(dati, a => +a.minute_in_quarter);
            dati = dati.map(a => [+a.minute_in_quarter + 1, a[y]])

            const randomCount = Math.floor(Math.random() * (35 - 5 + 1)) + 5;
            dati = dati.slice(0, randomCount);

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
                        data: dati
                    }
                ]
            };
        }
        else if (this.dashboardCard.card_id === 'LINE_CONSECUTIVE_MINUTES_PLAYED') {
            let dati: any[] = [];
            const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
            dati = await this._dbService.readList(new VTeamYearLeagueSummaryMinutesQuarter(), { team_id: team_id, league_year_id: 1 }) as VTeamYearLeagueSummaryMinutesQuarter[];
            dati = _.orderBy(dati, a => +a.minute_in_quarter);
            dati = dati.map(a => [+a.minute_in_quarter + 1, a[y]])

            const randomCount = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
            dati = dati.slice(0, randomCount);

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
                        data: dati
                    }
                ]
            };
        }
        else if (this.dashboardCard.card_id === 'RADAR_PLAYER_GAME' || this.dashboardCard.card_id === 'RADAR_PLAYER_TEAM') {
            const stat: string[] = this.dashboardCardSettings.find((setting) => setting.setting_id === 'STAT')?.value;
            const value = stat.map(a => [Math.floor(Math.random() * (90 - 10 + 1)) + 10])
            this.chartOption = {
                legend: {
                    data: ['Squadra A']
                },
                radar: {
                    indicator: stat.map(label => ({ name: label }))
                },
                series: [
                    {
                        name: 'Squadra A vs Squadra B',
                        type: 'radar',
                        data: [
                            {
                                value: value,
                                name: 'Squadra A'
                            }
                        ]
                    }
                ]
            };
        }
        else if (this.dashboardCard.card_id === 'SCATTER_3STAT_TEAM' || this.dashboardCard.card_id === 'SCATTER_3STAT_GAME') {
            let dati: any[] = [];
            const x = this.dashboardCardSettings.find((setting) => setting.setting_id === '1')?.value;
            const y = this.dashboardCardSettings.find((setting) => setting.setting_id === '2')?.value;
            const l = this.dashboardCardSettings.find((setting) => setting.setting_id === '3')?.value;
            dati = await this._dbService.readList(new VPlayerYearLeagueSummary()) as VPlayerYearLeagueSummary[];
            dati = dati.map(a => [a[x], a[y], a[l], a.player_surname + " " + a.player_name]);
            dati = dati.slice(0, 10);

            this.chartOption = {
                dataset: {
                  source: dati
                },
                tooltip: {
                  trigger: 'item',
                  formatter: function (params: any) {
                    return `${params.data[3]}<br/>${x}: ${params.data[0]}<br/>${y}: ${params.data[1]}<br/>${l}: ${params.data[2]}`;
                  }
                },
                xAxis: {
                  type: 'value',
                  name: x,
                  splitLine: { lineStyle: { type: 'dashed' } }
                },
                yAxis: {
                  type: 'value',
                  name: y,
                  splitLine: { lineStyle: { type: 'dashed' } }
                },
                visualMap: {
                  show: false,
                  dimension: 2,
                  inRange: {
                    symbolSize: [0, _.round((_.max(dati.map(x=>+x[2])) || 0)*25)]
                  }
                },
                series: {
                  type: 'scatter',
                  encode: { x: 0, y: 1 },
                  label: {
                    show: true,
                    position: 'top',
                    formatter: function (params: any) {
                      return params.data[3]; // Country name
                    }
                  }
                }
              };              
        }
        else if (this.dashboardCard.card_id === 'TABLE_LINEUP_GAME') {

        }
        else if (this.dashboardCard.card_id === 'TABLE_LINEUP_TEAM') {

        }
        else if (this.dashboardCard.card_id === 'TABLE_PLAYER_GAME') {

        }
        else if (this.dashboardCard.card_id === 'TABLE_PLAYER_TEAM') {

        }
    }
    getStat(p: any, s: string): any{
        if (p){
            return p[s];
        }
    }
    getPlayerFromId(id: number | undefined): Player | undefined {
        return this.players.find(x => x.id === id);
    }
}