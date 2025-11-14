import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as echarts from 'echarts';
import { EChartsCoreOption } from 'echarts/core';
import _, { round } from 'lodash';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { DbService } from '../../../../../../shared/services/db.service';
import { Player } from '../../../../../../shared/types/db/auto/Player';
import { PlayerTeamGame } from '../../../../../../shared/types/db/auto/PlayerTeamGame';
import { VGame } from '../../../../../../shared/types/db/auto/Vgame';
import { VPlayerGameAbsoluteMinuteBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameAbsoluteMinuteBoxscore';
import { VPlayerGameMinuteBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameMinuteBoxscore';
import { VPlayerGameMinutePlayedBeforeBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameMinutePlayedBeforeBoxscore';
import { VPlayerGameMinutePlayingBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameMinutePlayingBoxscore';
import { VPlayerGameTotalBoxscore } from '../../../../../../shared/types/db/auto/VPlayerGameTotalBoxscore';
import { VTeamGameAbsoluteMinuteBoxscore } from '../../../../../../shared/types/db/auto/VTeamGameAbsoluteMinuteBoxscore';
import { HttpClient } from '@angular/common/http';
import { SubPlay } from '../../../../../../shared/types/db/auto/SubPlay';
import { VTeamGameMinuteBoxscore } from '../../../../../../shared/types/db/auto/VTeamGameMinuteBoxscore';
import { VTeamGameTotalBoxscore } from '../../../../../../shared/types/db/auto/VTeamGameTotalBoxscore';
import { BaseCardComponent } from '../../base-card/base-card.component';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Formula } from '../../../../../../shared/types/db/auto/Formula';
["fouls_committed", "fouls_received", "points", "made_2pt", "missed_2pt", "pct_2pt", "made_3pt", "missed_3pt", "pct_3pt", "made_ft", "missed_ft", "pct_ft", "off_reb", "def_reb", "blocks_made", "blocks_suffered", "turnovers", "steals", "assists"]
@Component({
    selector: 'grafic-card',
    templateUrl: './grafic-card.component.html',
    standalone: true,
    imports: [
        NgxEchartsDirective,
        MatProgressSpinnerModule,
        RouterLink,
        NgClass,
    ],
    providers: [
        provideEchartsCore({ echarts }),
    ]
})
export class GraficCardComponent extends BaseCardComponent {

    chartOption: EChartsCoreOption = {};
    statTable: string[] = [];
    rows: any[] = [];
    rowsOpposite: any[] = [];
    player1: Player = new Player();
    player2: Player = new Player();
    player3: Player = new Player();
    player4: Player = new Player();
    player5: Player = new Player();
    minuti: any[] = [];
    formule: Formula[] = [];
    courtMap: any;
    avgRow1: { [key: string]: number } = {};
    avgRow4: { [key: string]: number } = {};
    avgRowAll: { [key: string]: number } = {};

    constructor(
        private _dbService: DbService,
        private http: HttpClient
    ) {
        super();
    }

    loading: boolean = false;

    override async loadChartOption(): Promise<void> {

        this.formule = await this._dbService.readList(new Formula(), {}) as Formula[];

        if ((this.gameIds && this.gameIds.length) || this.gameId){
            this.loading = true;

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
                fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 3);
                fourMonthsAgo.setDate(1); // parte dal primo del mese
    
                const data: [string, number][] = [];
    
                for (const item of dati) {
                    const gameId = item.game_id;
                    const minutes = Number(this.formula(y, item) ?? 0);
    
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
            else if (this.dashboardCard.card_id === 'LINE_STRES_LINEUP' || this.dashboardCard.card_id === 'LINE_STRES_PLAYER' || this.dashboardCard.card_id === 'LINE_STRES_TEAM') {
                let dati: any[] = [];
                const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
                let countOrdered: [number, number][] = [];
    
                if (this.playerId) {
                    dati = await this._dbService.viewLineupRoute<any[]>({
                        player_id: this.playerId,
                        game_ids: this.gameIds,
                        view: 'v_player_game_minute_boxscore',
                        stresView: true,
                        playerIn: [],
                        playerNotIn: []
                    });
    
                    const grouped = _.groupBy(dati, 'minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
    
                } else if (this.teamId && this.gameIds && this.gameIds?.length > 0 && (this.playerIds && this.playerIds?.length > 0 || this.playerOutIds && this.playerOutIds?.length > 0)) {
                    dati = await this._dbService.viewLineupRoute<any[]>({
                        team_id: this.teamId,
                        game_ids: this.gameIds,
                        view: 'v_team_game_minute_boxscore',
                        stresView: true,
                        playerIn: this.playerIds,
                        playerNotIn: this.playerOutIds
                    });
    
                    const grouped = _.groupBy(dati, 'minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
    
                } else if (this.teamId && this.gameIds && this.gameIds?.length > 0) {
                    dati = await this._dbService.viewLineupRoute<any[]>({
                        team_id: this.teamId,
                        game_ids: this.gameIds,
                        view: 'v_team_game_minute_boxscore',
                        stresView: true,
                        playerIn: [],
                        playerNotIn: []
                    });
    
                    const grouped = _.groupBy(dati, 'minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
                }
    
                dati = this.fillMissingMinutes(dati, 10);
                countOrdered = this.fillMissingMinutes(countOrdered, 10);
                // Mostra sempre la serie secondaria (conteggio item)
                const counts = countOrdered.map(c => c[1]);
                const extraSeries = [{
                    name: 'Items per minute',
                    type: 'line',
                    symbol: 'none',
                    yAxisIndex: 1,
                    lineStyle: {
                        color: '#888',
                        width: 1,
                        type: 'dashed'
                    },
                    data: countOrdered
                }];
    
                this.chartOption = {
                    grid: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: 'Stress',
                        nameLocation: 'middle',
                        nameGap: 25
                    },
                    yAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, '20%']
                        },
                        {
                            type: 'value',
                            name: '',
                            min: 0,
                            max: Math.max(...counts, 1),
                            axisLine: { show: false },
                            axisLabel: { color: '#888' },
                            splitLine: { show: false }
                        }
                    ],
                    visualMap: {
                        type: 'piecewise',
                        show: false,
                        dimension: 0,
                        seriesIndex: [0, 1],
                        pieces: [
                            { gt: 0, lt: 10, color: 'rgba(0, 0, 255, 0.4)' },
                        ]
                    },
                    legend: {
                        data: [y].concat(['Items per minute']),
                        top: 'top'
                    },
                    series: [
                        {
                            name: y,
                            type: 'line',
                            smooth: 0.5,
                            symbol: 'none',
                            lineStyle: {
                                color: '#1f77b4',
                                width: 3
                            },
                            areaStyle: { opacity: 0.5 },
                            data: dati
                        },
                        ...extraSeries
                    ]
                };
            }
            else if (this.dashboardCard.card_id === 'LINE_GAME_LINEUP' || this.dashboardCard.card_id === 'LINE_GAME_PLAYER' || this.dashboardCard.card_id === 'LINE_GAME_TEAM') {
                let dati: any[] = [];
                const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
                let countOrdered: [number, number][] = [];
    
                if (this.playerId) {
                    dati = await this._dbService.readList(new VPlayerGameMinuteBoxscore(), {
                        player_id: this.playerId,
                        game_id: { in: this.gameIds }
                    }) as VPlayerGameMinuteBoxscore[];
    
                    const grouped = _.groupBy(dati, 'minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
    
                } else if (this.teamId && this.gameIds && this.gameIds?.length > 0 && (this.playerIds && this.playerIds?.length > 0 || this.playerOutIds && this.playerOutIds?.length > 0)) {
                    dati = await this._dbService.viewLineupRoute<any[]>({
                        team_id: this.teamId,
                        game_ids: this.gameIds,
                        view: 'v_team_game_minute_boxscore',
                        playerIn: this.playerIds,
                        playerNotIn: this.playerOutIds
                    });
    
                    const grouped = _.groupBy(dati, 'minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
    
                } else if (this.teamId && this.gameIds && this.gameIds?.length > 0) {
                    dati = await this._dbService.readList(new VTeamGameMinuteBoxscore(), {
                        team_id: this.teamId,
                        game_id: { in: this.gameIds }
                    }) as VTeamGameMinuteBoxscore[];
    
                    const grouped = _.groupBy(dati, 'minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
                }
    
                dati = this.fillMissingMinutes(dati, 40);
                countOrdered = this.fillMissingMinutes(countOrdered, 40);
                // Mostra sempre la serie secondaria (conteggio item)
                const counts = countOrdered.map(c => c[1]);
                const extraSeries = [{
                    name: 'Items per minute',
                    type: 'line',
                    symbol: 'none',
                    yAxisIndex: 1,
                    lineStyle: {
                        color: '#888',
                        width: 1,
                        type: 'dashed'
                    },
                    data: countOrdered
                }];
    
                this.chartOption = {
                    grid: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: 'Minutes Game',
                        nameLocation: 'middle',
                        nameGap: 25
                    },
                    yAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, '20%']
                        },
                        {
                            type: 'value',
                            name: '',
                            min: 0,
                            max: Math.max(...counts, 1),
                            axisLine: { show: false },
                            axisLabel: { color: '#888' },
                            splitLine: { show: false }
                        }
                    ],
                    visualMap: {
                        type: 'piecewise',
                        show: false,
                        dimension: 0,
                        seriesIndex: [0, 1],
                        pieces: [
                            { gt: 0, lt: 9, color: 'rgba(0, 0, 255, 0.4)' },
                            { gt: 9, lt: 19, color: 'rgba(0, 0, 255, 0.1)' },
                            { gt: 19, lt: 29, color: 'rgba(0, 0, 255, 0.4)' },
                            { gt: 29, lt: 39, color: 'rgba(0, 0, 255, 0.1)' },
                        ]
                    },
                    legend: {
                        data: [y].concat(['Items per minute']),
                        top: 'top'
                    },
                    series: [
                        {
                            name: y,
                            type: 'line',
                            smooth: 0.5,
                            symbol: 'none',
                            lineStyle: {
                                color: '#1f77b4',
                                width: 3
                            },
                            areaStyle: { opacity: 0.5 },
                            data: dati
                        },
                        ...extraSeries
                    ]
                };
            }
            else if (this.dashboardCard.card_id === 'LINE_GAME_GAME') {
                let datiH: any[] = [];
                let datiG: any[] = [];
    
                const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
                const dati = await this._dbService.readList(new VPlayerGameMinuteBoxscore(), { game_id: this.gameId, }) as VPlayerGameMinuteBoxscore[];
                let game: any;
    
                if (this.gameId) {
                    game = await this._dbService.readUnique(new VGame(), { id: this.gameId, }) as VGame;
    
                    datiH = dati.filter(x => x.team_id === game.team_home_id);
                    datiG = dati.filter(x => x.team_id === game.team_guest_id);
    
                    const groupedH = _.groupBy(datiH, 'minute');
                    const groupedG = _.groupBy(datiG, 'minute');
    
                    const datiMediatiH = Object.entries(groupedH).map(([minute, items]) => {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        return [+minute, value];
                    });
                    datiH = _.orderBy(datiMediatiH, a => a[0]);
    
                    const datiMediatiG = Object.entries(groupedG).map(([minute, items]) => {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        return [+minute, value];
                    });
                    datiG = _.orderBy(datiMediatiG, a => a[0]);
                }
    
                this.chartOption = {
                    grid: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: 'Minutes Game',
                        nameLocation: 'middle',
                        nameGap: 25
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '20%']
                    },
                    visualMap: {
                        type: 'piecewise',
                        show: false,
                        dimension: 0,
                        seriesIndex: [0, 1],
                        pieces: [
                            { gt: 0, lt: 9, color: 'rgba(0, 0, 255, 0.4)' },
                            { gt: 9, lt: 19, color: 'rgba(0, 0, 255, 0.1)' },
                            { gt: 19, lt: 29, color: 'rgba(0, 0, 255, 0.4)' },
                            { gt: 29, lt: 39, color: 'rgba(0, 0, 255, 0.1)' }
                        ]
                    },
                    legend: {
                        data: [
                            y + ' ' + game?.team_home_name,
                            y + ' ' + game?.team_guest_name
                        ],
                        top: 'top'
                    },
                    series: [
                        {
                            name: y + ' ' + game?.team_home_name,
                            type: 'line',
                            smooth: 0.5,
                            symbol: 'none',
                            lineStyle: {
                                color: '#1f77b4',
                                width: 3
                            },
                            areaStyle: { opacity: 0.5 },
                            data: datiH
                        },
                        {
                            name: y + ' ' + game?.team_guest_name,
                            type: 'line',
                            smooth: 0.5,
                            symbol: 'none',
                            lineStyle: {
                                color: '#ff7f0e',
                                width: 3
                            },
                            areaStyle: { opacity: 0.5 },
                            data: datiG
                        }
                    ]
                };
            }
            else if (this.dashboardCard.card_id === 'LINE_QUARTER_LINEUP' || this.dashboardCard.card_id === 'LINE_QUARTER_PLAYER' || this.dashboardCard.card_id === 'LINE_QUARTER_TEAM') {
                let dati: any[] = [];
                const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
                let countOrdered: [number, number][] = [];
    
                if (this.playerId) {
                    dati = await this._dbService.readList(new VPlayerGameAbsoluteMinuteBoxscore(), {
                        player_id: this.playerId,
                        game_id: { in: this.gameIds }
                    }) as VPlayerGameAbsoluteMinuteBoxscore[];
    
                    const grouped = _.groupBy(dati, 'absolute_minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
    
                } else if (this.teamId && this.gameIds && this.gameIds.length > 0 && (this.playerIds && this.playerIds?.length > 0 || this.playerOutIds && this.playerOutIds?.length > 0)) {
                    dati = await this._dbService.viewLineupRoute<any[]>({
                        team_id: this.teamId,
                        game_ids: this.gameIds,
                        view: 'v_team_game_absolute_minute_boxscore',
                        playerIn: this.playerIds,
                        playerNotIn: this.playerOutIds
                    });
    
                    const grouped = _.groupBy(dati, 'absolute_minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
    
                } else if (this.teamId && this.gameIds && this.gameIds.length > 0) {
                    dati = await this._dbService.readList(new VTeamGameAbsoluteMinuteBoxscore(), {
                        team_id: this.teamId,
                        game_id: { in: this.gameIds }
                    }) as VTeamGameAbsoluteMinuteBoxscore[];
    
                    const grouped = _.groupBy(dati, 'absolute_minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
                }
                dati = this.fillMissingMinutes(dati, 10);
                countOrdered = this.fillMissingMinutes(countOrdered, 10);
    
                // Serie sempre presente per conteggio item
                const counts = countOrdered.map(c => c[1]);
                const extraSeries = [{
                    name: 'Items per minute',
                    type: 'line',
                    symbol: 'none',
                    yAxisIndex: 1,
                    lineStyle: {
                        color: '#888',
                        width: 1,
                        type: 'dashed'
                    },
                    data: countOrdered
                }];
    
                this.chartOption = {
                    grid: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: 'Minutes Quarter',
                        nameLocation: 'middle',
                        nameGap: 25
                    },
                    yAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, '20%']
                        },
                        {
                            type: 'value',
                            name: '',
                            min: 0,
                            max: Math.max(...counts, 1),
                            axisLine: { show: false },
                            axisLabel: { color: '#888' },
                            splitLine: { show: false }
                        }
                    ],
                    visualMap: {
                        type: 'piecewise',
                        show: false,
                        dimension: 0,
                        seriesIndex: [0, 1],
                        pieces: [
                            { gt: 0, lt: 4, color: 'rgba(0, 0, 255, 0.1)' },
                            { gt: 4, lt: 7, color: 'rgba(0, 0, 255, 0.2)' },
                            { gt: 7, lt: 9, color: 'rgba(0, 0, 255, 0.4)' }
                        ]
                    },
                    legend: {
                        data: [y, 'Items per minute'],
                        top: 'top'
                    },
                    series: [
                        {
                            name: y,
                            type: 'line',
                            smooth: 0.5,
                            symbol: 'none',
                            lineStyle: {
                                color: '#1f77b4',
                                width: 3
                            },
                            areaStyle: { opacity: 0.5 },
                            data: dati
                        },
                        ...extraSeries
                    ]
                };
            }
            else if (this.dashboardCard.card_id === 'LINE_QUARTER_GAME') {
                let datiH: any[] = [];
                let datiG: any[] = [];
    
                const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
                const dati = await this._dbService.readList(new VPlayerGameAbsoluteMinuteBoxscore(), { game_id: this.gameId, }) as VPlayerGameAbsoluteMinuteBoxscore[];
                let game: any;
    
                if (this.gameId) {
                    game = await this._dbService.readUnique(new VGame(), { id: this.gameId, }) as VGame;
    
                    datiH = dati.filter(x => x.team_id === game.team_home_id);
                    datiG = dati.filter(x => x.team_id === game.team_guest_id);
    
                    const groupedH = _.groupBy(datiH, 'absolute_minute');
                    const groupedG = _.groupBy(datiG, 'absolute_minute');
    
                    const datiMediatiH = Object.entries(groupedH).map(([absolute_minute, items]) => {
                        let value: number;
    
                        value = this.formula(y, null, items);
    
                        return [+absolute_minute, value];
                    });
                    datiH = _.orderBy(datiMediatiH, a => a[0]);
    
                    const datiMediatiG = Object.entries(groupedG).map(([absolute_minute, items]) => {
                        let value: number;
    
                        value = this.formula(y, null, items);

                        return [+absolute_minute, value];
                    });
                    datiG = _.orderBy(datiMediatiG, a => a[0]);
                }
    
                this.chartOption = {
                    grid: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: 'Minutes Quarter',
                        nameLocation: 'middle',
                        nameGap: 25
                    },
                    yAxis: {
                        type: 'value',
                        boundaryGap: [0, '20%']
                    },
                    visualMap: {
                        type: 'piecewise',
                        show: false,
                        dimension: 0,
                        seriesIndex: [0, 1],
                        pieces: [
                            { gt: 0, lt: 4, color: 'rgba(0, 0, 255, 0.1)' },
                            { gt: 4, lt: 7, color: 'rgba(0, 0, 255, 0.2)' },
                            { gt: 7, lt: 9, color: 'rgba(0, 0, 255, 0.4)' }
                        ]
                    },
                    legend: {
                        data: [
                            y + ' ' + game?.team_home_name,
                            y + ' ' + game?.team_guest_name
                        ],
                        top: 'top'
                    },
                    series: [
                        {
                            name: y + ' ' + game?.team_home_name,
                            type: 'line',
                            smooth: 0.5,
                            symbol: 'none',
                            lineStyle: {
                                color: '#1f77b4',
                                width: 3
                            },
                            areaStyle: { opacity: 0.5 },
                            data: datiH
                        },
                        {
                            name: y + ' ' + game?.team_guest_name,
                            type: 'line',
                            smooth: 0.5,
                            symbol: 'none',
                            lineStyle: {
                                color: '#ff7f0e',
                                width: 3
                            },
                            areaStyle: { opacity: 0.5 },
                            data: datiG
                        }
                    ]
                };
            }
            else if (this.dashboardCard.card_id === 'LINE_PLAY_GAME' || this.dashboardCard.card_id === 'LINE_PLAY_PLAYER' || this.dashboardCard.card_id === 'LINE_PLAY_TEAM') {
                let dati: any[] = [];
                const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
                dati = []//await this._dbService.readList(new VTeamYearLeagueSummarySecondsPlay(), { team_id: team_id, league_year_id: 1 }) as VTeamYearLeagueSummarySecondsPlay[];
                dati = _.orderBy(dati, a => +a.second_in_play);
                dati = dati.map(a => [+a.second_in_play, this.formula(y, a)])
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
                        data: [y],
                        top: 'top'
                    },
                    series: [
                        {
                            name: y,
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
                let countOrdered: [number, number][] = [];
    
                if (this.playerId) {
                    dati = await this._dbService.readList(new VPlayerGameMinutePlayedBeforeBoxscore(), {
                        player_id: this.playerId,
                        game_id: { in: this.gameIds }
                    }) as VPlayerGameMinutePlayedBeforeBoxscore[];
    
                    const grouped = _.groupBy(dati, 'minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;

                        value = this.formula(y, null, items);

                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
                }
    
                // Serie sempre presente per conteggio item
                const counts = countOrdered.map(c => c[1]);
                const extraSeries = [{
                    name: 'Items per minute',
                    type: 'line',
                    symbol: 'none',
                    yAxisIndex: 1,
                    lineStyle: {
                        color: '#888',
                        width: 1,
                        type: 'dashed'
                    },
                    data: countOrdered
                }];
    
                this.chartOption = {
                    grid: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: 'Minutes Played',
                        nameLocation: 'middle',
                        nameGap: 25
                    },
                    yAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, '20%']
                        },
                        {
                            type: 'value',
                            name: 'N. campioni',
                            min: 0,
                            max: Math.max(...counts, 1),
                            axisLine: { show: false },
                            axisLabel: { color: '#888' },
                            splitLine: { show: false }
                        }
                    ],
                    visualMap: {
                        type: 'piecewise',
                        show: false,
                        dimension: 0,
                        seriesIndex: [0, 1],
                        pieces: [
                            { gt: 0, lt: 9, color: 'rgba(0, 0, 255, 0.4)' },
                            { gt: 9, lt: 19, color: 'rgba(0, 0, 255, 0.1)' },
                            { gt: 19, lt: 29, color: 'rgba(0, 0, 255, 0.4)' },
                            { gt: 29, lt: 39, color: 'rgba(0, 0, 255, 0.1)' }
                        ]
                    },
                    legend: {
                        data: [y, 'Items per minute'],
                        top: 'top'
                    },
                    series: [
                        {
                            name: y,
                            type: 'line',
                            smooth: 0.5,
                            symbol: 'none',
                            lineStyle: {
                                color: '#1f77b4',
                                width: 3
                            },
                            areaStyle: { opacity: 0.5 },
                            data: dati
                        },
                        ...extraSeries
                    ]
                };
            }
            else if (this.dashboardCard.card_id === 'LINE_CONSECUTIVE_MINUTES_PLAYED') {
                let dati: any[] = [];
                const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
                let countOrdered: [number, number][] = [];
    
                if (this.playerId) {
                    dati = await this._dbService.readList(new VPlayerGameMinutePlayingBoxscore(), {
                        player_id: this.playerId,
                        game_id: { in: this.gameIds }
                    }) as VPlayerGameMinutePlayingBoxscore[];
    
                    const grouped = _.groupBy(dati, 'minute');
                    const datiMediati: [number, number][] = [];
                    const countPerMinute: [number, number][] = [];
    
                    for (const [minute, items] of Object.entries(grouped)) {
                        let value: number;
    
                        value = this.formula(y, null, items);

                        datiMediati.push([+minute, value]);
                        countPerMinute.push([+minute, items.length]);
                    }
    
                    dati = _.orderBy(datiMediati, a => a[0]);
                    countOrdered = _.orderBy(countPerMinute, a => a[0]);
                }
    
                // Serie sempre presente per conteggio item
                const counts = countOrdered.map(c => c[1]);
                const extraSeries = [{
                    name: 'Items per minute',
                    type: 'line',
                    symbol: 'none',
                    yAxisIndex: 1,
                    lineStyle: {
                        color: '#888',
                        width: 1,
                        type: 'dashed'
                    },
                    data: countOrdered
                }];
    
                this.chartOption = {
                    grid: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20,
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        name: 'Consecutive Minutes Played',
                        nameLocation: 'middle',
                        nameGap: 25
                    },
                    yAxis: [
                        {
                            type: 'value',
                            boundaryGap: [0, '20%']
                        },
                        {
                            type: 'value',
                            name: 'N. campioni',
                            min: 0,
                            max: Math.max(...counts, 1),
                            axisLine: { show: false },
                            axisLabel: { color: '#888' },
                            splitLine: { show: false }
                        }
                    ],
                    visualMap: {
                        type: 'piecewise',
                        show: false,
                        dimension: 0,
                        seriesIndex: [0, 1],
                        pieces: [
                            { gt: 0, lt: 9, color: 'rgba(0, 0, 255, 0.4)' },
                            { gt: 9, lt: 19, color: 'rgba(0, 0, 255, 0.1)' },
                            { gt: 19, lt: 29, color: 'rgba(0, 0, 255, 0.4)' },
                            { gt: 29, lt: 39, color: 'rgba(0, 0, 255, 0.1)' }
                        ]
                    },
                    legend: {
                        data: [y, 'Items per minute'],
                        top: 'top'
                    },
                    series: [
                        {
                            name: y,
                            type: 'line',
                            smooth: 0.5,
                            symbol: 'none',
                            lineStyle: {
                                color: '#1f77b4',
                                width: 3
                            },
                            areaStyle: { opacity: 0.5 },
                            data: dati
                        },
                        ...extraSeries
                    ]
                };
            }
            else if (this.dashboardCard.card_id === 'RADAR_PLAYER_LINEUP' || this.dashboardCard.card_id === 'RADAR_GAME_PLAYER' || this.dashboardCard.card_id === 'RADAR_PLAYER_GAME' || this.dashboardCard.card_id === 'RADAR_PLAYER_TEAM') {
                const stat: string[] = this.dashboardCardSettings.find((setting) => setting.setting_id === 'STAT')?.value;
                let radarData: any[] = [];
                if (this.playerId) {
                    const value = await this._dbService.readList(new VPlayerGameTotalBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds } }) as VPlayerGameTotalBoxscore[];
                    // Genera una serie per ogni riga di value
                    radarData = value.map((row, index) => {
                        const values = stat.map(key => Number(this.formula(key, row) ?? 0)); // fallback a 0
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
                        const values = stat.map(key => Number(this.formula(key, row) ?? 0)); // fallback a 0
                        return {
                            value: values,
                            name: `Partita ${index + 1}` // puoi anche usare date se vuoi: gameDateMap.get(row.game_id)
                        };
                    });
                }
                else if (this.teamId && this.gameIds && this.gameIds.length > 0 && (this.playerIds && this.playerIds?.length > 0 || this.playerOutIds && this.playerOutIds?.length > 0)) {
                    const value = await this._dbService.viewLineupRoute<any[]>({
                        team_id: this.teamId, game_ids: this.gameIds,
                        view: 'v_team_game_total_boxscore', playerIn: this.playerIds, playerNotIn: this.playerOutIds
                    });
                    // Genera una serie per ogni riga di value
                    radarData = value.map((row, index) => {
                        const values = stat.map(key => Number(this.formula(key, row) ?? 0)); // fallback a 0
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
                        const values = stat.map(key => Number(this.formula(key, row) ?? 0)); // fallback a 0
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
            else if (this.dashboardCard.card_id === 'SCATTER_3STAT_LINEUP' || this.dashboardCard.card_id === 'SCATTER_3STAT_PLAYER' || this.dashboardCard.card_id === 'SCATTER_3STAT_TEAM' || this.dashboardCard.card_id === 'SCATTER_3STAT_GAME') {
                let dati: any[] = [];
                const x = this.dashboardCardSettings.find((setting) => setting.setting_id === '1')?.value;
                const y = this.dashboardCardSettings.find((setting) => setting.setting_id === '2')?.value;
                const l = this.dashboardCardSettings.find((setting) => setting.setting_id === '3')?.value;
    
                if (this.playerId) {
                    const game = await this._dbService.readList(new VGame(), { id: { in: this.gameIds, }, }) as VGame[];
                    dati = await this._dbService.readList(new VPlayerGameTotalBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds, }, }) as VPlayerGameTotalBoxscore[];
                    dati = dati.map(a => [
                        this.formula(x, a),
                        this.formula(y, a),
                        this.formula(l, a),
                        game.find(x => x.id === a.game_id)?.team_home_name + '-' + game.find(x => x.id === a.game_id)?.team_guest_name
                    ]);
                }
                else if (this.gameId) {
                    const game = await this._dbService.readUnique(new VGame(), { id: this.gameId,}) as VGame;

                    dati = await this._dbService.readList(new VPlayerGameTotalBoxscore(), { game_id: this.gameId, }) as VPlayerGameTotalBoxscore[];
                    const player = await this._dbService.readList(new Player(), { id: { in: dati.map(x => x.player_id), }, }) as Player[];
                    dati = dati.map(a => [
                        this.formula(x, a),
                        this.formula(y, a),
                        this.formula(l, a),
                        player.find(x => x.id === a.player_id)?.name + ' ' + player.find(x => x.id === a.player_id)?.surname,
                        a.team_id === game.team_home_id? true: false
                    ]);
                }
                else if (this.teamId && this.gameIds && this.gameIds.length > 0 && this.playerIds && (this.playerIds && this.playerIds?.length > 0 || this.playerOutIds && this.playerOutIds?.length > 0)) {
                    dati = await this._dbService.viewLineupRoute<any[]>({
                        team_id: this.teamId, game_ids: this.gameIds,
                        view: 'v_team_game_total_boxscore', playerIn: this.playerIds, playerNotIn: this.playerOutIds
                    });
                    const game = await this._dbService.readList(new VGame(), { id: { in: this.gameIds, }, }) as VGame[];
                    dati = dati.map(a => [this.formula(x, a), this.formula(y, a), this.formula(l, a),
                        game.find(x => x.id === a.game_id)?.team_home_id === this.teamId ?
                        game.find(x => x.id === a.game_id)?.team_guest_name :
                        game.find(x => x.id === a.game_id)?.team_home_name,
                        this.isWin(game.find(x => x.id === a.game_id), this.teamId)]);
                }
                else if (this.teamId) {
                    dati = await this._dbService.readList(new VTeamGameTotalBoxscore(), { team_id: this.teamId, game_id: { in: this.gameIds, }, }) as VTeamGameTotalBoxscore[];
                    const game = await this._dbService.readList(new VGame(), { id: { in: this.gameIds, }, }) as VGame[];
                    dati = dati.map(a => [this.formula(x, a), this.formula(y, a), this.formula(l, a),
                        game.find(x => x.id === a.game_id)?.team_home_id === this.teamId ?
                        game.find(x => x.id === a.game_id)?.team_guest_name :
                        game.find(x => x.id === a.game_id)?.team_home_name,
                        this.isWin(game.find(x => x.id === a.game_id), this.teamId)]);
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
    
                dati = [
                    ['x', 'y', 'z', 'label', 'win'],  // intestazione fittizia
                    ...dati
                ];
    
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
                        },
                        itemStyle: {
                            color: function (params: any) {
                                return params.data[4] ? 'green' : 'red';  // 👈 Personalizza qui i colori
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
                    this.calcolaMedieStatistiche();
                }
            }
            else if (this.dashboardCard.card_id === 'TABLE_GAME_LINEUP' || this.dashboardCard.card_id === 'TABLE_GAME_PLAYER' || this.dashboardCard.card_id === 'TABLE_PLAYER_GAME' || this.dashboardCard.card_id === 'TABLE_GAME_TEAM') {
                this.statTable = this.dashboardCardSettings.find((setting) => setting.setting_id === 'STAT')?.value;
                if (this.playerId) {
                    const game = await this._dbService.readList(new VGame(), {id: { in: this.gameIds },}) as VGame[];

                    this.rows = (await this._dbService.readList(new VPlayerGameTotalBoxscore(), { player_id: this.playerId, game_id: { in: this.gameIds } }) as VPlayerGameTotalBoxscore[]).map(row => ({
                        ...row,
                        description: game.find(x => x.id === row.game_id)?.team_home_name + '-' + game.find(x => x.id === row.game_id)?.team_guest_name,
                        win: this.isWin(game.find(x=>x.id === row.game_id), row.team_id)
                    }));
                    this.calcolaMedieStatistiche();
                }
                else if (this.gameId) {
                    const game = await this._dbService.readUnique(new VGame(), { id: this.gameId,}) as VGame;

                    const playerTeamGame = await this._dbService.readList(new PlayerTeamGame(), { game_id: this.gameId, }) as PlayerTeamGame[];
                    const player = await this._dbService.readList(new Player(), { id: { in: playerTeamGame.map(x => x.player_id), }, }) as Player[];
                    this.rows = (await this._dbService.readList(new VPlayerGameTotalBoxscore(), { game_id: this.gameId, }) as VPlayerGameTotalBoxscore[]).map(row => ({
                        ...row,
                        description: player.find(x => x.id === row.player_id)?.name + ' ' + player.find(x => x.id === row.player_id)?.surname,
                        win: row.team_id === game.team_home_id? true: false
                    }));
                    this.rows = _.orderBy(this.rows, a => +a.points, 'desc');
                    this.calcolaMedieStatistiche();
                }
                else if (this.teamId && this.gameIds && this.gameIds.length > 0 && this.playerIds) {
                    const game = await this._dbService.readList(new VGame(), {
                        id: { in: this.gameIds },
                    }) as VGame[];
    
                    this.rows = await Promise.all((await this._dbService.viewLineupRoute<any[]>({
                        team_id: this.teamId,
                        game_ids: this.gameIds,
                        view: 'v_team_game_total_boxscore',
                        playerIn: this.playerIds,
                        playerNotIn: this.playerOutIds
                    })).map(async row => {
                        const opponentTeamId = this.getOpponent(game.find(x => x.id === row.game_id), this.teamId);
    
                        const opponentStats = await this._dbService.viewLineupRoute<any[]>({
                            team_id: opponentTeamId,
                            game_ids: [row.game_id],
                            view: 'v_team_game_total_boxscore',
                            playerIn: this.playerIds,
                            playerNotIn: this.playerOutIds
                        });
    
                        const opponentRenamed: any = {};
                        for (const [key, value] of Object.entries(opponentStats[0] || {})) {
                            opponentRenamed[`${key}o`] = value; // aggiunge "o" alla fine del campo
                        }
    
                        const gameInfo = game.find(x => x.id === row.game_id);
    
                        return {
                            ...row,
                            ...opponentRenamed,
                            description: gameInfo?.team_home_id === this.teamId
                                ? gameInfo?.team_guest_name
                                : gameInfo?.team_home_name,
                            win: this.isWin(gameInfo, this.teamId)
                        };
                    }));
    
                    this.calcolaMedieStatistiche(true);
                }
                else if (this.teamId) {
                    const game = await this._dbService.readList(new VGame(), { id: { in: this.gameIds, }, }) as VGame[];
                    this.rows = (await this._dbService.readList(new VTeamGameTotalBoxscore(), { team_id: this.teamId, game_id: { in: this.gameIds } }) as VTeamGameTotalBoxscore[]).map(row => ({
                        ...row,
                        description: game.find(x => x.id === row.game_id)?.team_home_id === this.teamId ? game.find(x => x.id === row.game_id)?.team_guest_name : game.find(x => x.id === row.game_id)?.team_home_name
                    }));

                    this.rows = await Promise.all((await this._dbService.readList(new VTeamGameTotalBoxscore(),
                        { team_id: this.teamId, game_id: { in: this.gameIds } }) as VTeamGameTotalBoxscore[]).map(async row => {
                        const opponentTeamId = this.getOpponent(game.find(x => x.id === row.game_id), this.teamId);
    
                        const opponentStats = await this._dbService.readList(new VTeamGameTotalBoxscore(),
                        { team_id: this.teamId, game_id: { in: this.gameIds } }) as VTeamGameTotalBoxscore[];
    
                        const opponentRenamed: any = {};
                        for (const [key, value] of Object.entries(opponentStats[0] || {})) {
                            opponentRenamed[`${key}o`] = value; // aggiunge "o" alla fine del campo
                        }
    
                        const gameInfo = game.find(x => x.id === row.game_id);
    
                        return {
                            ...row,
                            ...opponentRenamed,
                            description: gameInfo?.team_home_id === this.teamId
                                ? gameInfo?.team_guest_name
                                : gameInfo?.team_home_name,
                            win: this.isWin(gameInfo, this.teamId)
                        };
                    }));

                    this.calcolaMedieStatistiche();
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
    
                        value = this.formula(y, null, items);
    
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
                                { gt: 0, lt: 9, color: 'rgba(0, 0, 255, 0.4)' },
                                { gt: 9, lt: 19, color: 'rgba(0, 0, 255, 0.1)' },
                                { gt: 19, lt: 29, color: 'rgba(0, 0, 255, 0.4)' },
                                { gt: 29, lt: 39, color: 'rgba(0, 0, 255, 0.1)' },
                            ]
                        },
                        legend: {
                            data: [y],
                            top: 'top'
                        },
                        series: [
                            {
                                name: y,
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
            else if (this.dashboardCard.card_id === 'SHOT_CHART_LINEUP' || this.dashboardCard.card_id === 'SHOT_CHART_PLAYER' || this.dashboardCard.card_id === 'SHOT_CHART_GAME' || this.dashboardCard.card_id === 'SHOT_CHART_TEAM') {
                this.http.get<any>('assets/court.json').subscribe(courtMap => {
                    this.courtMap = courtMap;
                    echarts.registerMap('nbaCourt', courtMap.borderGeoJSON);
                    this.buildChart();
                });
            }
            this.loading = false;
        }

    }

    async buildChart() {
        let shots: any[] = [];

        if (this.playerId) {
            const tiri = await this._dbService.readList(new SubPlay(), { game_made_id: { in: this.gameIds, }, player_made_id: this.playerId, shot_id: { in: [1, 2, 3, 4], }, }) as SubPlay[];
            shots = tiri.map(t => ({
                x: (t.y || 0) * 0.51 - 26,
                y: (this.getX(t.x) || 0) * 0.51 - 2,
                made: this.getMade(t.shot_id)
            }));
        }
        else if (this.gameId) {
            const tiri = await this._dbService.readList(new SubPlay(), { game_made_id: this.gameId, shot_id: { in: [1, 2, 3, 4], }, }) as SubPlay[];
            shots = tiri.map(t => ({
                x: (t.y || 0) * 0.51 - 26,
                y: (this.getX(t.x) || 0) * 0.51 - 2,
                made: this.getMade(t.shot_id)
            }));
        }
        else if (this.teamId && this.gameIds && this.gameIds.length > 0 && this.playerIds && (this.playerIds && this.playerIds?.length > 0 || this.playerOutIds && this.playerOutIds?.length > 0)) {
            const tiri = await this._dbService.viewLineupRoute<any[]>({
                team_id: this.teamId, game_ids: this.gameIds,
                view: 'sub_play', playerIn: this.playerIds, playerNotIn: this.playerOutIds
            });
            shots = tiri.map(t => ({
                x: (t.y || 0) * 0.51 - 26,
                y: (this.getX(t.x) || 0) * 0.51 - 2,
                made: this.getMade(t.shot_id)
            }));
        }
        else if (this.teamId) {
            const tiri = await this._dbService.readList(new SubPlay(), { game_made_id: { in: this.gameIds, }, team_made_id: this.teamId, shot_id: { in: [1, 2, 3, 4], }, }) as SubPlay[];
            shots = tiri.map(t => ({
                x: (t.y || 0) * 0.51 - 26,
                y: (this.getX(t.x) || 0) * 0.51 - 2,
                made: this.getMade(t.shot_id)
            }));
        }

        const shotPoints = shots.map(s => [s.x, s.y, s.made ? 1 : 0]);
        const radius = 1;
        const hexBinResult = this.hexBinStatistics(shotPoints, radius);

        const data = hexBinResult.bins.map((bin: any) => {
            const made = bin.points.reduce((sum: any, p: any) => sum + p[2], 0);
            return [
                bin.x,
                bin.y,
                bin.points.length,
                +((made / bin.points.length) * 100).toFixed(2)
            ];
        });

        const renderItemHexBin = (params: any, api: any) => this.renderItemHexBin(params, api, hexBinResult);
        const renderItemNBACourt = (param: any, api: any) => this.renderItemNBACourt(param, api);

        this.chartOption = {
            backgroundColor: '#333',
            tooltip: {
                backgroundColor: 'rgba(255,255,255,0.9)',
                textStyle: { color: '#333' }
            },
            animation: false,
            geo: {
                map: 'nbaCourt',
                roam: false,
                silent: true,
                itemStyle: { color: '#333', borderWidth: 0 },
                left: 0, right: 0, top: 0, bottom: 0
            },
            visualMap: {
                type: 'continuous',
                orient: 'horizontal',
                right: 30,
                top: 40,
                min: 0,
                max: 100,
                dimension: 3,
                calculable: true,
                textStyle: { color: '#eee' },
                formatter: '{value} %',
                inRange: {
                    color: ['red', '#6abe83', '#00ff00'] // grigio → verde chiaro → verde pieno
                },
            },
            series: [
                {
                    type: 'custom',
                    coordinateSystem: 'geo',
                    geoIndex: 0,
                    renderItem: renderItemHexBin,
                    dimensions: [null, null, 'FGA', 'FG%'],
                    encode: { tooltip: [2, 3] },
                    data
                },
                {
                    coordinateSystem: 'geo',
                    type: 'custom',
                    geoIndex: 0,
                    renderItem: renderItemNBACourt,
                    silent: true,
                    data: [0]
                }
            ]
        };
    }

    getOpponent(game: any, team_id: any): number | undefined {
        if (game.team_home_id === team_id) {
            return game.team_guest_id;
        }
        return game.team_home_id;
    }

    fillMissingMinutes(array: [number, number][], num: number): [number, number][] {
        const minuteMap = new Map(array.map(([minute, value]) => [minute, value]));

        const result: [number, number][] = [];
        for (let minute = 1; minute <= num; minute++) {
            const value = minuteMap.get(minute) ?? 0;
            result.push([minute, value]);
        }

        return result;
    }

    calcolaMedieStatistiche(oppositor?: boolean): void {
        this.rows = _.orderBy(this.rows, x => x.game_id);
        this.avgRow1 = {};
        this.avgRow4 = {};
        this.avgRowAll = {};

        if (!this.rows || this.rows.length === 0) return;

        for (const stat of this.statTable) {

            const valoreAll = this.formula(stat, null, this.rows);
            const valore4 = this.formula(stat, null, this.rows.slice(-4));
            const valore1 = this.formula(stat, null, this.rows.slice(-1));

            this.avgRowAll[stat] = +valoreAll;
            this.avgRow4[stat] = +valore4;
            this.avgRow1[stat] = +valore1;

            if (oppositor) {
                const statO = `${stat}o`;

                const valoreAll = this.formula(stat, null, this.rows, true);
                const valore4 = this.formula(stat, null, this.rows.slice(-4), true);
                const valore1 = this.formula(stat, null, this.rows.slice(-1), true);
                this.avgRowAll[statO] = +valoreAll;
                this.avgRow4[statO] = +valore4;
                this.avgRow1[statO] = +valore1;
            }
        }

        if (this.dashboardCard.card_id === 'TABLE_LINEUP_TEAM') {
            const minVals = this.rows.map(row => +row.minutes_played || 0);
            const minMedia = minVals.reduce((a, b) => a + b, 0) / minVals.length;
            this.avgRow1['minutes_played'] = +minMedia.toFixed(1);
        }

    }

    getRouterLinkTable(row: any, card: string | undefined): any[] {
        if (card === 'TABLE_LINEUP_TEAM') {
            return ['/pages/lineups', this.teamId];
        }
        if (card === 'TABLE_PLAYER_GAME') {
            return ['/pages/players', row.player_id];
        }
        return ['/pages/games', row.game_id];
    }

    getQueryParams(row: any, card: string | undefined): any {
        if (card === 'TABLE_LINEUP_TEAM') {
            return { pIds: [row.player1.id, row.player2.id, row.player3.id, row.player4.id, row.player5.id] };
        }
        if (card === 'TABLE_PLAYER_GAME') {
            return { gId: row.game_id };
        }
        return null;
    }

    getMade(shot_id: any): boolean {
        if (shot_id == 1 || shot_id == 3) {
            return true;
        }
        return false;
    }

    getX(x: any): number {
        if (x < 50) {
            return x * 2;
        }
        return (-x + 100) * 2;
    }

    getColSpan(stat: string, card: string | undefined): number {
        if (card === 'TABLE_GAME_LINEUP' || card === 'TABLE_GAME_TEAM') {
            if (stat === 'points') {
                return 3;
            }
            return 2;
        }
        else {
            return 1
        }
    }

    getPlusMinus(p: number, po: number): number {
        return isNaN(+(p - po)) ? 0 : +(p - po).toFixed(1);

    }

    isWin(game: VGame | undefined, teamId: number | undefined): boolean {
        if (game){
            if (game.team_home_id === teamId){
                if (game.team_home_points && game.team_guest_points && game?.team_home_points > game?.team_guest_points){
                    return true;
                }
                else {
                    return false;
                }
            }
            if (game.team_guest_id === teamId){
                if (game.team_home_points && game.team_guest_points && game?.team_home_points < game?.team_guest_points){
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        return false;
    }

    renderItemNBACourt(param: any, api: any) {
        return {
            type: 'group',
            children: this.courtMap.geometry.map((item: any) => {
                return {
                    type: item.type,
                    style: {
                        stroke: '#aaa',
                        fill: null,
                        lineWidth: 1.5
                    },
                    shape: {
                        points: item.points.map(api.coord)
                    }
                };
            })
        };
    }

    renderItemHexBin(params: any, api: any, hexBinResult: any) {
        const center = api.coord([api.value(0), api.value(1)]);
        const points = [];
        const pointsBG = [];
        const maxViewRadius = api.size([1, 0])[0];
        const minViewRadius = Math.min(maxViewRadius, 4);
        const extentMax = Math.log(Math.sqrt(hexBinResult.maxBinLen));
        const viewRadius = echarts.number.linearMap(
            Math.log(Math.sqrt(api.value(2))),
            [0, extentMax],
            [minViewRadius, maxViewRadius]
        );
        let angle = Math.PI / 6;
        for (let i = 0; i < 6; i++, angle += Math.PI / 3) {
            points.push([
                center[0] + viewRadius * Math.cos(angle),
                center[1] + viewRadius * Math.sin(angle)
            ]);
            pointsBG.push([
                center[0] + maxViewRadius * Math.cos(angle),
                center[1] + maxViewRadius * Math.sin(angle)
            ]);
        }
        return {
            type: 'group',
            children: [
                {
                    type: 'polygon',
                    shape: { points },
                    style: {
                        stroke: '#ccc',
                        fill: api.visual('color'),
                        lineWidth: 1
                    }
                },
                {
                    type: 'polygon',
                    shape: { points: pointsBG },
                    style: {
                        stroke: null,
                        fill: 'rgba(0,0,0,0.5)',
                        lineWidth: 0
                    },
                    z2: -19
                }
            ]
        };
    }

    hexBinStatistics(points: any, r: number) {
        const dx = r * 2 * Math.sin(Math.PI / 3);
        const dy = r * 1.5;
        const binsById: { [key: string]: any } = {};
        const bins: any[] = [];

        for (let i = 0; i < points.length; ++i) {
            let [px, py, made] = points[i];
            if (isNaN(px) || isNaN(py)) continue;

            let pj = Math.round((py = py / dy));
            let pi = Math.round((px = px / dx - (pj & 1) / 2));
            const py1 = py - pj;

            if (Math.abs(py1) * 3 > 1) {
                const px1 = px - pi;
                const pi2 = pi + ((px < pi ? -1 : 1) / 2);
                const pj2 = pj + (py < pj ? -1 : 1);
                const px2 = px - pi2;
                const py2 = py - pj2;

                if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2) {
                    pi = pi2 + ((pj & 1) ? 1 : -1) / 2;
                    pj = pj2;
                }
            }

            const id = `${pi}-${pj}`;
            let bin = binsById[id];
            if (bin) {
                bin.points.push([px * dx, py * dy, made]);
            } else {
                bin = {
                    points: [[px * dx, py * dy, made]],
                    x: (pi + (pj & 1) / 2) * dx,
                    y: pj * dy
                };
                binsById[id] = bin;
                bins.push(bin);
            }
        }

        let maxBinLen = -Infinity;
        for (let i = 0; i < bins.length; i++) {
            maxBinLen = Math.max(maxBinLen, bins[i].points.length);
        }

        return {
            maxBinLen,
            bins
        };
    }

    formula(field: string, a: any, b?: any[], o?: boolean): number {
        if (!!a && Object.keys(a).length > 0){

            let fieldKey = field;
            if (fieldKey.endsWith('o')) {
                fieldKey = fieldKey.slice(0, -1);
            }

            // Cerca se il campo è una formula definita
            const formulaEntry = this.formule?.find(f => f.name === fieldKey);

            // Se NON è una formula, usa il valore diretto
            if (!formulaEntry || !formulaEntry.formula) {
                return isNaN(+a[(o?field+'o':field)]) ? 0 : +a[(o?field+'o':field)]; // campo semplice
            }
        
            try {
                const formula = formulaEntry.formula;
        
                if (field === 'poss'){
                    const asd= 0;
                }
                // Estrai tutti i nomi dei campi usati nella formula
                const fieldNames = Object.keys(a);
        
                // Sostituisci ogni nome di campo con il suo valore
                let evaluatedFormula = formula.replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, match => {
                    if (fieldNames.includes(match)) {
                        return a[(o?match+'o':match)] ?? 0; // fallback a 0
                    }
                    return match;
                });
        
                evaluatedFormula = evaluatedFormula
                    .replace(/−|–|—/g, '-') // sostituisce tutti i "falsi meno" con il vero meno
                    .replace(/\s+/g, '');   // rimuove eventuali spazi

                // Esegui la formula calcolata
                // Esegui la formula calcolata e gestisci il caso NaN
                const result = Function(`"use strict"; return (${evaluatedFormula})`)();
                return isNaN(result) ? 0 : +result.toFixed(1);
            } catch (error) {
                console.warn(`Errore nell'elaborazione della formula '${field}'`, error);
                return 0;
            }
        }
        else {
            // Cerca se il campo è una formula definita
            const formulaEntry = this.formule?.find(f => f.name === field);
        
            // Se NON è una formula, usa il valore diretto
            if (!formulaEntry || !formulaEntry.formula) {
                if (field.startsWith('pct_')) {
                    let suffix = field.slice(4);
                    suffix = suffix + (o?'o':'');
                    const madeKey = `made_${suffix}`;
                    const missedKey = `missed_${suffix}`;
                    const madeSum = _.sumBy(b, item => +item[madeKey] || 0);
                    const missedSum = _.sumBy(b, item => +item[missedKey] || 0);
                    const total = madeSum + missedSum;
                    return total > 0 ? +((madeSum * 100) / total).toFixed(1) : 0;
                } else {
                    return +_.meanBy(b, item => +this.formula(field, item, [], o) || 0).toFixed(1);
                }    
            }

            try {
                const formula = formulaEntry.formula;
        
                // Estrai tutti i nomi dei campi usati nella formula
                if (b && b.length > 0){
                    const fieldNames = Object.keys(b[0]);
        
                    // Sostituisci ogni nome di campo con il suo valore
                    let evaluatedFormula = formula.replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, match => {
                        if (fieldNames.includes(match)) {
                            return _.meanBy(b, item => +this.formula(match, item, [], o) || 0).toString(); // fallback a 0
                        }
                        return match;
                    });
            
                    evaluatedFormula = evaluatedFormula
                        .replace(/−|–|—/g, '-') // sostituisce tutti i "falsi meno" con il vero meno
                        .replace(/\s+/g, '');   // rimuove eventuali spazi
                    
                    // Esegui la formula calcolata
                    // Esegui la formula calcolata e gestisci il caso NaN
                    const result = Function(`"use strict"; return (${evaluatedFormula})`)();
                    return isNaN(result) ? 0 : +result.toFixed(1);
                }
                else {
                    return 0;
                }
            } catch (error) {
                console.warn(`Errore nell'elaborazione della formula '${field}'`, error);
                return 0;
            }
        }
    }
        
}
