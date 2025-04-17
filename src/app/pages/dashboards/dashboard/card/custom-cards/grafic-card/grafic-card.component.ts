import { Component, Input } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { DbService } from '../../../../../../shared/services/db.service';
import { BaseCardComponent } from '../../base-card/base-card.component';
import _ from 'lodash';
import { VPlayerGameMinuteBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameMinuteBoxscore';
import { VPlayerGameAbsoluteMinuteBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameAbsoluteMinuteBoxscore';
import { VPlayerGameTotalBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameTotalBoxscore';
import { Game } from '../../../../../../shared/types/db/auto/Game';
import { VGame } from '../../../../../../shared/types/db/auto/Vgame';
import { VPlayerGameMinutePlayedBeforeBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameMinutePlayedBeforeBoxscore';
import { VPlayerGameMinutePlayingBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameMinutePlayingBoxscore';
import { VTeamGameTotalBoxscore } from '../../../../../../shared/types/db/auto/VTeamGameTotalBoxscore';
import { Player } from '../../../../../../shared/types/db/auto/Player';
import { PlayerTeamGame } from '../../../../../../shared/types/db/auto/PlayerTeamGame';
import { VTeamGameMinuteBoxscore } from '../../../../../../shared/types/db/auto/VTeamGameMinuteBoxscore';
import { VTeamGameAbsoluteMinuteBoxscore } from '../../../../../../shared/types/db/auto/VTeamGameAbsoluteMinuteBoxscore';

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
    statTable: string[] = [];
    rows: any[] = [];
    player1: Player = new Player();
    player2: Player = new Player();
    player3: Player = new Player();
    player4: Player = new Player();
    player5: Player = new Player();
    minuti: any[] = [];

    constructor(private _dbService: DbService) {
        super();
    }

    override async loadChartOption(): Promise<void> {

        if (this.dashboardCard.card_id === 'CALENDAR_PLAYER' || this.dashboardCard.card_id === 'CALENDAR_TEAM') {
            let dati: any[] = [];
            let range = 2
            const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;

            if (this.playerId) {
                dati = await this._dbService.readList(new VPlayerGameTotalBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds } }) as VPlayerGameTotalBoxscore[];
            }
            else if (this.teamId) {
                range = 6
                dati = await this._dbService.readList(new VTeamGameTotalBoxscore(), { team_id: this.teamId, game_id: { in: this.gameIds } }) as VTeamGameTotalBoxscore[];
            }

            // Leggi le date delle partite
            const gameList = await this._dbService.readList(new VGame(), {
                id: { in: this.gameIds }
            }) as VGame[];

            // Mappa game_id → data (in formato YYYY-MM-DD)
            const gameDateMap = new Map<number, string>();
            gameList.forEach(g => {
                if (g.id && g.date_hours_utc) {
                    gameDateMap.set(g.id, g.date_hours_utc.toISOString().slice(0, 10));
                }
            });

            // Determina la data massima delle partite (ultima giocata)
            const allDates = [...gameDateMap.values()].sort();
            const lastDate = new Date(allDates[allDates.length - 1]);
            const fourMonthsAgo = new Date(lastDate);
            fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
            fourMonthsAgo.setDate(1); // parte dal primo del mese

            const data: [string, number][] = [];

            for (const item of dati) {
                const gameId = item.game_id;
                const minutes = Number(item[y] ?? 0);

                // Salta se manca game_id o se non ha minuti
                if (!gameId || minutes <= 0) continue;

                const dateStr = gameDateMap.get(gameId);
                if (!dateStr) continue;

                const gameDate = new Date(dateStr);

                // Considera solo le partite negli ultimi 4 mesi dall’ultima
                if (gameDate < fourMonthsAgo || gameDate > lastDate) continue;

                data.push([dateStr, minutes]);
            }

            // Ordina per data
            data.sort((a, b) => a[0].localeCompare(b[0]));


            // Configura il calendario tra primo giorno di 4 mesi fa e data dell’ultima partita
            const startDateStr = fourMonthsAgo.toISOString().slice(0, 10);
            const endDateStr = lastDate.toISOString().slice(0, 10);

            this.chartOption = {
                tooltip: {
                    position: 'top'
                },
                calendar: {
                    range: [startDateStr, endDateStr],
                    orient: 'vertical',
                    left: 35,
                    yearLabel: {
                        margin: 40
                    },
                    monthLabel: {
                        nameMap: 'en',
                        margin: 10,
                        position: 'start'
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
                        return val[1] / range;
                    },
                    data: data
                }
            };
        }
        else if (this.dashboardCard.card_id === 'LINE_GAME_GAME' || this.dashboardCard.card_id === 'LINE_GAME_PLAYER' || this.dashboardCard.card_id === 'LINE_GAME_TEAM') {
            let dati: any[] = [];
            const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
            if (this.playerId) {
                dati = await this._dbService.readList(new VPlayerGameMinuteBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds, }, }) as VPlayerGameMinuteBoxscore[];
                const grouped = _.groupBy(dati, 'minute');

                const datiMediati = Object.entries(grouped).map(([minute, items]) => {
                    let value: number;

                    if (y.startsWith('pct_')) {
                        const suffix = y.slice(4); // es. '2pt' da 'pct_2pt'
                        const madeKey = `made_${suffix}`;
                        const missedKey = `missed_${suffix}`;
                        const madeSum = _.sumBy(items, item => +item[madeKey] || 0);
                        const missedSum = _.sumBy(items, item => +item[missedKey] || 0);
                        const total = madeSum + missedSum;
                        value = total > 0 ? (madeSum * 100) / total : 0;
                    } else {
                        value = _.meanBy(items, item => +item[y] || 0);
                    }

                    return [+minute, value];
                });

                dati = _.orderBy(datiMediati, a => a[0]);
            }
            else if (this.gameId) {
                dati = await this._dbService.readList(new VPlayerGameMinuteBoxscore(), { game_id: this.gameId, }) as VPlayerGameMinuteBoxscore[];
                const grouped = _.groupBy(dati, 'minute');

                const datiMediati = Object.entries(grouped).map(([minute, items]) => {
                    let value: number;

                    if (y.startsWith('pct_')) {
                        const suffix = y.slice(4); // es. '2pt' da 'pct_2pt'
                        const madeKey = `made_${suffix}`;
                        const missedKey = `missed_${suffix}`;
                        const madeSum = _.sumBy(items, item => +item[madeKey] || 0);
                        const missedSum = _.sumBy(items, item => +item[missedKey] || 0);
                        const total = madeSum + missedSum;
                        value = total > 0 ? (madeSum * 100) / total : 0;
                    } else {
                        value = _.meanBy(items, item => +item[y] || 0);
                    }

                    return [+minute, value];
                });

                dati = _.orderBy(datiMediati, a => a[0]);
            }
            else if (this.teamId) {
                dati = await this._dbService.readList(new VTeamGameMinuteBoxscore(), { team_id: this.teamId, game_id: { in: this.gameIds, }, }) as VTeamGameMinuteBoxscore[];
                const grouped = _.groupBy(dati, 'minute');

                const datiMediati = Object.entries(grouped).map(([minute, items]) => {
                    let value: number;

                    if (y.startsWith('pct_')) {
                        const suffix = y.slice(4); // es. '2pt' da 'pct_2pt'
                        const madeKey = `made_${suffix}`;
                        const missedKey = `missed_${suffix}`;
                        const madeSum = _.sumBy(items, item => +item[madeKey] || 0);
                        const missedSum = _.sumBy(items, item => +item[missedKey] || 0);
                        const total = madeSum + missedSum;
                        value = total > 0 ? (madeSum * 100) / total : 0;
                    } else {
                        value = _.meanBy(items, item => +item[y] || 0);
                    }

                    return [+minute, value];
                });

                dati = _.orderBy(datiMediati, a => a[0]);
            }

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
                    data: ['A'],
                    top: 'top'
                },
                series: [
                    {
                        name: 'A',
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
            if (this.playerId) {
                dati = await this._dbService.readList(new VPlayerGameAbsoluteMinuteBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds, }, }) as VPlayerGameAbsoluteMinuteBoxscore[];
                const grouped = _.groupBy(dati, 'absolute_minute');

                const datiMediati = Object.entries(grouped).map(([absolute_minute, items]) => {
                    let value: number;

                    if (y.startsWith('pct_')) {
                        const suffix = y.slice(4); // es. '2pt' da 'pct_2pt'
                        const madeKey = `made_${suffix}`;
                        const missedKey = `missed_${suffix}`;
                        const madeSum = _.sumBy(items, item => +item[madeKey] || 0);
                        const missedSum = _.sumBy(items, item => +item[missedKey] || 0);
                        const total = madeSum + missedSum;
                        value = total > 0 ? (madeSum * 100) / total : 0;
                    } else {
                        value = _.meanBy(items, item => +item[y] || 0);
                    }

                    return [+absolute_minute, value];
                });

                dati = _.orderBy(datiMediati, a => a[0]);
            }
            else if (this.gameId) {
                dati = await this._dbService.readList(new VPlayerGameAbsoluteMinuteBoxscore(), { game_id: this.gameId, }) as VPlayerGameAbsoluteMinuteBoxscore[];
                const grouped = _.groupBy(dati, 'absolute_minute');

                const datiMediati = Object.entries(grouped).map(([absolute_minute, items]) => {
                    let value: number;

                    if (y.startsWith('pct_')) {
                        const suffix = y.slice(4); // es. '2pt' da 'pct_2pt'
                        const madeKey = `made_${suffix}`;
                        const missedKey = `missed_${suffix}`;
                        const madeSum = _.sumBy(items, item => +item[madeKey] || 0);
                        const missedSum = _.sumBy(items, item => +item[missedKey] || 0);
                        const total = madeSum + missedSum;
                        value = total > 0 ? (madeSum * 100) / total : 0;
                    } else {
                        value = _.meanBy(items, item => +item[y] || 0);
                    }

                    return [+absolute_minute, value];
                });

                dati = _.orderBy(datiMediati, a => a[0]);
            }
            else if (this.teamId) {
                dati = await this._dbService.readList(new VTeamGameAbsoluteMinuteBoxscore(), { team_id: this.teamId, game_id: { in: this.gameIds, }, }) as VTeamGameAbsoluteMinuteBoxscore[];
                const grouped = _.groupBy(dati, 'absolute_minute');

                const datiMediati = Object.entries(grouped).map(([absolute_minute, items]) => {
                    let value: number;

                    if (y.startsWith('pct_')) {
                        const suffix = y.slice(4); // es. '2pt' da 'pct_2pt'
                        const madeKey = `made_${suffix}`;
                        const missedKey = `missed_${suffix}`;
                        const madeSum = _.sumBy(items, item => +item[madeKey] || 0);
                        const missedSum = _.sumBy(items, item => +item[missedKey] || 0);
                        const total = madeSum + missedSum;
                        value = total > 0 ? (madeSum * 100) / total : 0;
                    } else {
                        value = _.meanBy(items, item => +item[y] || 0);
                    }

                    return [+absolute_minute, value];
                });

                dati = _.orderBy(datiMediati, a => a[0]);
            }
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
                    data: ['A'],
                    top: 'top'
                },
                series: [
                    {
                        name: 'A',
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
            dati = []//await this._dbService.readList(new VTeamYearLeagueSummarySecondsPlay(), { team_id: team_id, league_year_id: 1 }) as VTeamYearLeagueSummarySecondsPlay[];
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
                    data: ['A'],
                    top: 'top'
                },
                series: [
                    {
                        name: 'A',
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
            if (this.playerId) {
                dati = await this._dbService.readList(new VPlayerGameMinutePlayedBeforeBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds, }, }) as VPlayerGameMinutePlayedBeforeBoxscore[];
                const grouped = _.groupBy(dati, 'minute');

                const datiMediati = Object.entries(grouped).map(([minute, items]) => {
                    let value: number;

                    if (y.startsWith('pct_')) {
                        const suffix = y.slice(4); // es. '2pt' da 'pct_2pt'
                        const madeKey = `made_${suffix}`;
                        const missedKey = `missed_${suffix}`;
                        const madeSum = _.sumBy(items, item => +item[madeKey] || 0);
                        const missedSum = _.sumBy(items, item => +item[missedKey] || 0);
                        const total = madeSum + missedSum;
                        value = total > 0 ? (madeSum * 100) / total : 0;
                    } else {
                        value = _.meanBy(items, item => +item[y] || 0);
                    }

                    return [+minute, value];
                });

                dati = _.orderBy(datiMediati, a => a[0]);
            }
            if (this.teamId) {
                dati = await this._dbService.readList(new VPlayerGameMinuteBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds, }, }) as VPlayerGameMinutePlayedBeforeBoxscore[];
            }

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
                        { gt: 0, lt: 10, color: 'rgba(60, 179, 113, 0.4)' },
                        { gt: 10, lt: 20, color: 'rgba(255, 165, 0, 0.4)' },
                        { gt: 20, lt: 30, color: 'rgba(255, 0, 0, 0.4)' },
                        { gt: 30, lt: 40, color: 'rgba(255, 0, 165, 0.4)' }
                    ]
                },
                legend: {
                    data: ['A'],
                    top: 'top'
                },
                series: [
                    {
                        name: 'A',
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
            if (this.playerId) {
                dati = await this._dbService.readList(new VPlayerGameMinutePlayingBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds, }, }) as VPlayerGameMinutePlayingBoxscore[];
                const grouped = _.groupBy(dati, 'minute');

                const datiMediati = Object.entries(grouped).map(([minute, items]) => {
                    let value: number;

                    if (y.startsWith('pct_')) {
                        const suffix = y.slice(4); // es. '2pt' da 'pct_2pt'
                        const madeKey = `made_${suffix}`;
                        const missedKey = `missed_${suffix}`;
                        const madeSum = _.sumBy(items, item => +item[madeKey] || 0);
                        const missedSum = _.sumBy(items, item => +item[missedKey] || 0);
                        const total = madeSum + missedSum;
                        value = total > 0 ? (madeSum * 100) / total : 0;
                    } else {
                        value = _.meanBy(items, item => +item[y] || 0);
                    }

                    return [+minute, value];
                });

                dati = _.orderBy(datiMediati, a => a[0]);
            }
            if (this.teamId) {
                dati = await this._dbService.readList(new VPlayerGameMinutePlayedBeforeBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds, }, }) as VPlayerGameMinuteBoxscore[];
            }

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
                        { gt: 0, lt: 10, color: 'rgba(60, 179, 113, 0.4)' },
                        { gt: 10, lt: 20, color: 'rgba(255, 165, 0, 0.4)' },
                        { gt: 20, lt: 30, color: 'rgba(255, 0, 0, 0.4)' },
                        { gt: 30, lt: 40, color: 'rgba(255, 0, 165, 0.4)' }
                    ]
                },
                legend: {
                    data: ['A'],
                    top: 'top'
                },
                series: [
                    {
                        name: 'A',
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
        else if (this.dashboardCard.card_id === 'RADAR_GAME_PLAYER' || this.dashboardCard.card_id === 'RADAR_PLAYER_GAME' || this.dashboardCard.card_id === 'RADAR_PLAYER_TEAM') {
            const stat: string[] = this.dashboardCardSettings.find((setting) => setting.setting_id === 'STAT')?.value;
            let radarData: any[] = [];
            if (this.playerId) {
                const value = await this._dbService.readList(new VPlayerGameTotalBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds } }) as VPlayerGameTotalBoxscore[];
                // Genera una serie per ogni riga di value
                radarData = value.map((row, index) => {
                    const values = stat.map(key => Number(row[key as keyof typeof row] ?? 0)); // fallback a 0
                    return {
                        value: values,
                        name: `Partita ${index + 1}` // puoi anche usare date se vuoi: gameDateMap.get(row.game_id)
                    };
                });
            }
            else if (this.gameId) {
                const value = await this._dbService.readList(new VPlayerGameTotalBoxscore(), { game_id: this.gameId, }) as VPlayerGameTotalBoxscore[];
                // Genera una serie per ogni riga di value
                radarData = value.map((row, index) => {
                    const values = stat.map(key => Number(row[key as keyof typeof row] ?? 0)); // fallback a 0
                    return {
                        value: values,
                        name: `Partita ${index + 1}` // puoi anche usare date se vuoi: gameDateMap.get(row.game_id)
                    };
                });
            }
            else if (this.teamId) {
                const value = await this._dbService.readList(new VTeamGameTotalBoxscore(), { team_id: this.teamId, game_id: { in: this.gameIds } }) as VTeamGameTotalBoxscore[];
                // Genera una serie per ogni riga di value
                radarData = value.map((row, index) => {
                    const values = stat.map(key => Number(row[key as keyof typeof row] ?? 0)); // fallback a 0
                    return {
                        value: values,
                        name: `Partita ${index + 1}` // puoi anche usare date se vuoi: gameDateMap.get(row.game_id)
                    };
                });
            }

            // Costruisci chartOption
            this.chartOption = {
                //legend: {
                //    data: radarData.map(d => d.name)
                //},
                radar: {
                    indicator: stat.map(label => ({ name: label }))
                },
                series: [
                    {
                        name: 'Radar Statistiche',
                        type: 'radar',
                        data: radarData
                    }
                ]
            };
        }
        else if (this.dashboardCard.card_id === 'SCATTER_3STAT_PLAYER' || this.dashboardCard.card_id === 'SCATTER_3STAT_TEAM' || this.dashboardCard.card_id === 'SCATTER_3STAT_GAME') {
            let dati: any[] = [];
            const x = this.dashboardCardSettings.find((setting) => setting.setting_id === '1')?.value;
            const y = this.dashboardCardSettings.find((setting) => setting.setting_id === '2')?.value;
            const l = this.dashboardCardSettings.find((setting) => setting.setting_id === '3')?.value;

            if (this.playerId) {
                const game = await this._dbService.readList(new VGame(), { id: { in: this.gameIds, }, }) as VGame[];
                dati = await this._dbService.readList(new VPlayerGameTotalBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds, }, }) as VPlayerGameTotalBoxscore[];
                dati = dati.map(a => [a[x], a[y], a[l], game.find(x => x.id === a.game_id)?.team_home_name + '-' + game.find(x => x.id === a.game_id)?.team_guest_name]);
            }
            else if (this.gameId) {
                dati = await this._dbService.readList(new VPlayerGameTotalBoxscore(), { game_id: this.gameId, }) as VPlayerGameTotalBoxscore[];
                const player = await this._dbService.readList(new Player(), { id: { in: dati.map(x => x.player_id), }, }) as Player[];
                dati = dati.map(a => [a[x], a[y], a[l], player.find(x => x.id === a.player_id)?.name + ' ' + player.find(x => x.id === a.player_id)?.surname]);
            }
            else if (this.teamId) {
                dati = await this._dbService.readList(new VTeamGameTotalBoxscore(), { team_id: this.teamId, game_id: { in: this.gameIds, }, }) as VTeamGameTotalBoxscore[];
                const game = await this._dbService.readList(new VGame(), { id: { in: this.gameIds, }, }) as VGame[];
                dati = dati.map(a => [a[x], a[y], a[l], game.find(x => x.id === a.game_id)?.team_home_id === this.teamId ? game.find(x => x.id === a.game_id)?.team_guest_name : game.find(x => x.id === a.game_id)?.team_home_name]);
            }

            // Step 1: calcolo min e max dei valori nella dimensione 2
            const values = dati.map(row => +row[2]).filter(v => !isNaN(v));
            const minVal = Math.min(...values);
            const maxVal = Math.max(...values);

            // Step 2: funzione di scalatura lineare
            const scaleSymbolSize = (val: number): number => {
                const minSize = 10;
                const maxSize = 40;

                if (isNaN(val)) return minSize;
                if (maxVal === minVal) return (minSize + maxSize) / 2;

                const normalized = (val - minVal) / (maxVal - minVal);
                return minSize + normalized * (maxSize - minSize);
            };

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
                visualMap: undefined,
                series: {
                    type: 'scatter',
                    encode: { x: 0, y: 1 },
                    symbolSize: function (val: any[]) {
                        return scaleSymbolSize(+val[2]);
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function (params: any) {
                            return params.data[3];
                        }
                    }
                }
            };
        }
        else if (this.dashboardCard.card_id === 'TABLE_LINEUP_GAME') {

        }
        else if (this.dashboardCard.card_id === 'TABLE_LINEUP_TEAM') {
            this.statTable = this.dashboardCardSettings.find((setting) => setting.setting_id === 'STAT')?.value;

            if (this.gameIds && this.gameIds.length > 0 && this.teamId) {
                const result = await this._dbService.callCustomRoute<any[]>('lineup-boxscore', { team_id: this.teamId, game_ids: this.gameIds, });
                this.rows = result.map(row => ({
                    ...row
                }));
            }
        }
        else if (this.dashboardCard.card_id === 'TABLE_GAME_PLAYER' || this.dashboardCard.card_id === 'TABLE_PLAYER_GAME' || this.dashboardCard.card_id === 'TABLE_GAME_TEAM') {
            this.statTable = this.dashboardCardSettings.find((setting) => setting.setting_id === 'STAT')?.value;
            if (this.playerId) {
                const game = await this._dbService.readList(new VGame(), { id: { in: this.gameIds, }, }) as VGame[];
                this.rows = (await this._dbService.readList(new VPlayerGameTotalBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds } }) as VPlayerGameTotalBoxscore[]).map(row => ({
                    ...row,
                    description: game.find(x => x.id === row.game_id)?.team_home_name + '-' + game.find(x => x.id === row.game_id)?.team_guest_name
                }));
            }
            else if (this.gameId) {
                const playerTeamGame = await this._dbService.readList(new PlayerTeamGame(), { game_id: this.gameId, }) as PlayerTeamGame[];
                const player = await this._dbService.readList(new Player(), { id: { in: playerTeamGame.map(x => x.player_id), }, }) as Player[];
                this.rows = (await this._dbService.readList(new VPlayerGameTotalBoxscore(), { game_id: this.gameId, }) as VPlayerGameTotalBoxscore[]).map(row => ({
                    ...row,
                    description: player.find(x => x.id === row.player_id)?.name + ' ' + player.find(x => x.id === row.player_id)?.surname
                }));
            }
            else if (this.teamId) {
                const game = await this._dbService.readList(new VGame(), { id: { in: this.gameIds, }, }) as VGame[];
                this.rows = (await this._dbService.readList(new VTeamGameTotalBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds } }) as VTeamGameTotalBoxscore[]).map(row => ({
                    ...row,
                    description: game.find(x => x.id === row.game_id)?.team_home_id === this.teamId ? game.find(x => x.id === row.game_id)?.team_guest_name : game.find(x => x.id === row.game_id)?.team_home_name
                }));
            }
        }
        else if (this.dashboardCard.card_id === 'LINEUP') {
            if (this.gameId) {
                this.minuti = await this._dbService.callCustomLineupRoute<any[]>('lineup-boxscore', { game_id: this.gameId, });
                for (let i = 1; i < this.minuti.length; i++) {
                    // Trova il minuto precedente valido per team A
                    let j = i - 1;
                    let prevA: number[] = [];
                    while (j >= 0) {
                        if (this.minuti[j].teamA_players.length > 0) {
                            prevA = this.minuti[j].teamA_players.map((p: any) => p.id);
                            break;
                        }
                        j--;
                    }

                    const currA = this.minuti[i].teamA_players;
                    this.minuti[i].teamA_players = currA.map((p: any) => ({
                        ...p,
                        entered: !prevA.includes(p.id)
                    }));

                    // Trova il minuto precedente valido per team B
                    j = i - 1;
                    let prevB: number[] = [];
                    while (j >= 0) {
                        if (this.minuti[j].teamB_players.length > 0) {
                            prevB = this.minuti[j].teamB_players.map((p: any) => p.id);
                            break;
                        }
                        j--;
                    }

                    const currB = this.minuti[i].teamB_players;
                    this.minuti[i].teamB_players = currB.map((p: any) => ({
                        ...p,
                        entered: !prevB.includes(p.id)
                    }));
                }

                let dati: any[] = [];
                const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;

                dati = await this._dbService.readList(new VPlayerGameMinuteBoxscore(), { game_id: this.gameId, }) as VPlayerGameMinuteBoxscore[];
                const grouped = _.groupBy(dati, 'minute');

                const datiMediati = Object.entries(grouped).map(([minute, items]) => {
                    let value: number;

                    if (y.startsWith('pct_')) {
                        const suffix = y.slice(4); // es. '2pt' da 'pct_2pt'
                        const madeKey = `made_${suffix}`;
                        const missedKey = `missed_${suffix}`;
                        const madeSum = _.sumBy(items, item => +item[madeKey] || 0);
                        const missedSum = _.sumBy(items, item => +item[missedKey] || 0);
                        const total = madeSum + missedSum;
                        value = total > 0 ? (madeSum * 100) / total : 0;
                    } else {
                        value = _.meanBy(items, item => +item[y] || 0);
                    }

                    return [+minute, value];
                });

                dati = _.orderBy(datiMediati, a => a[0]);

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
                        name: '',
                        nameLocation: 'middle',
                        nameGap: 50,
                        axisLabel: { show: false },
                        axisLine: { show: false },
                        splitLine: { show: false }
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        top: '10%',
                        bottom: '0%',
                        containLabel: false
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
                        data: ['A'],
                        top: 'top'
                    },
                    series: [
                        {
                            name: 'A',
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
    }
}
