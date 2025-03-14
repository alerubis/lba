import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
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

    override loadChartOption(): void {
        const x = this.dashboardCardSettings.find((setting) => setting.setting_id === 'X')?.value;
        const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
        if (x === 'PLAY') {
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
                    name: 'Percentuale da 2 punti',
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
                    data: ['Squadra A', 'Squadra B'],
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
                            ['0', 42], ['1', 45], ['2', 47], ['3', 50], ['4', 52], ['5', 54], ['6', 53], ['7', 51],
                            ['8', 48], ['9', 46], ['10', 44]
                        ]
                    },
                    {
                        name: 'Squadra B',
                        type: 'line',
                        smooth: 0.5,
                        symbol: 'none',
                        lineStyle: {
                            color: '#ff7f0e',
                            width: 3
                        },
                        areaStyle: { opacity: 0.5 },
                        data: [
                            ['0', 38], ['1', 41], ['2', 43], ['3', 46], ['4', 48], ['5', 49], ['6', 48], ['7', 46],
                            ['8', 44], ['9', 41], ['10', 40]
                        ]
                    }
                ]
            };

        } else if (x === 'QUARTER') {
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
                    name: 'Percentuale da 2 punti',
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
                    data: ['Squadra A', 'Squadra B'],
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
                            ['0', 42],
                            ['0.5', 44],
                            ['1', 45],
                            ['1.5', 46],
                            ['2', 47],
                            ['2.5', 49],
                            ['3', 50],
                            ['3.5', 51],
                            ['4', 52],
                            ['4.5', 53],
                            ['5', 54],
                            ['5.5', 53],
                            ['6', 53],
                            ['6.5', 52],
                            ['7', 51],
                            ['7.5', 50],
                            ['8', 48],
                            ['8.5', 47],
                            ['9', 46],
                            ['9.5', 45],
                            ['10', 44]
                        ]
                    },
                    {
                        name: 'Squadra B',
                        type: 'line',
                        smooth: 0.5,
                        symbol: 'none',
                        lineStyle: {
                            color: '#ff7f0e',
                            width: 3
                        },
                        areaStyle: { opacity: 0.5 },
                        data: [
                            ['0', 38],
                            ['0.5', 39],
                            ['1', 41],
                            ['1.5', 42],
                            ['2', 43],
                            ['2.5', 44],
                            ['3', 46],
                            ['3.5', 47],
                            ['4', 48],
                            ['4.5', 48],
                            ['5', 49],
                            ['5.5', 48],
                            ['6', 48],
                            ['6.5', 47],
                            ['7', 46],
                            ['7.5', 45],
                            ['8', 44],
                            ['8.5', 43],
                            ['9', 41],
                            ['9.5', 40],
                            ['10', 40]
                        ]
                    }
                ]
            };

        } else {
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
                    name: 'Percentuale da 2 punti',
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
                    data: ['Squadra A', 'Squadra B'],
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
                            ['0', 38],
                            ['0.5', 39],
                            ['1', 41],
                            ['1.5', 42],
                            ['2', 43],
                            ['2.5', 44],
                            ['3', 46],
                            ['3.5', 47],
                            ['4', 48],
                            ['4.5', 48],
                            ['5', 49],
                            ['5.5', 48],
                            ['6', 48],
                            ['6.5', 47],
                            ['7', 46],
                            ['7.5', 45],
                            ['8', 44],
                            ['8.5', 43],
                            ['9', 41],
                            ['9.5', 40],
                            ['10', 38],
                            ['10.5', 39],
                            ['11', 41],
                            ['11.5', 42],
                            ['12', 43],
                            ['12.5', 44],
                            ['13', 46],
                            ['13.5', 47],
                            ['14', 48],
                            ['14.5', 48],
                            ['15', 49],
                            ['15.5', 48],
                            ['16', 48],
                            ['16.5', 47],
                            ['17', 46],
                            ['17.5', 45],
                            ['18', 44],
                            ['18.5', 43],
                            ['19', 41],
                            ['19.5', 40],
                            ['20', 38],
                            ['20.5', 39],
                            ['21', 41],
                            ['21.5', 42],
                            ['22', 43],
                            ['22.5', 44],
                            ['23', 46],
                            ['23.5', 47],
                            ['24', 48],
                            ['24.5', 48],
                            ['25', 49],
                            ['25.5', 48],
                            ['26', 48],
                            ['26.5', 47],
                            ['27', 46],
                            ['27.5', 45],
                            ['28', 44],
                            ['28.5', 43],
                            ['29', 41],
                            ['29.5', 40],
                            ['30', 38],
                            ['30.5', 39],
                            ['31', 41],
                            ['31.5', 42],
                            ['32', 43],
                            ['32.5', 44],
                            ['33', 46],
                            ['33.5', 47],
                            ['34', 48],
                            ['34.5', 48],
                            ['35', 49],
                            ['35.5', 48],
                            ['36', 48],
                            ['36.5', 47],
                            ['37', 46],
                            ['37.5', 45],
                            ['38', 44],
                            ['38.5', 43],
                            ['39', 41],
                            ['39.5', 40],
                            ['40', 38]
                        ]
                    },
                    {
                        name: 'Squadra B',
                        type: 'line',
                        smooth: 0.5,
                        symbol: 'none',
                        lineStyle: {
                            color: '#ff7f0e',
                            width: 3
                        },
                        areaStyle: { opacity: 0.5 },
                        data: [
                            ['0', 42],
                            ['0.5', 44],
                            ['1', 45],
                            ['1.5', 46],
                            ['2', 47],
                            ['2.5', 49],
                            ['3', 50],
                            ['3.5', 51],
                            ['4', 52],
                            ['4.5', 53],
                            ['5', 54],
                            ['5.5', 53],
                            ['6', 53],
                            ['6.5', 52],
                            ['7', 51],
                            ['7.5', 50],
                            ['8', 48],
                            ['8.5', 47],
                            ['9', 46],
                            ['9.5', 45],
                            ['10', 42],
                            ['10.5', 44],
                            ['11', 45],
                            ['11.5', 46],
                            ['12', 47],
                            ['12.5', 49],
                            ['13', 50],
                            ['13.5', 51],
                            ['14', 52],
                            ['14.5', 53],
                            ['15', 54],
                            ['15.5', 53],
                            ['16', 53],
                            ['16.5', 52],
                            ['17', 51],
                            ['17.5', 50],
                            ['18', 48],
                            ['18.5', 47],
                            ['19', 46],
                            ['19.5', 45],
                            ['20', 42],
                            ['20.5', 44],
                            ['21', 45],
                            ['21.5', 46],
                            ['22', 47],
                            ['22.5', 49],
                            ['23', 50],
                            ['23.5', 51],
                            ['24', 52],
                            ['24.5', 53],
                            ['25', 54],
                            ['25.5', 53],
                            ['26', 53],
                            ['26.5', 52],
                            ['27', 51],
                            ['27.5', 50],
                            ['28', 48],
                            ['28.5', 47],
                            ['29', 46],
                            ['29.5', 45],
                            ['30', 42],
                            ['30.5', 44],
                            ['31', 45],
                            ['31.5', 46],
                            ['32', 47],
                            ['32.5', 49],
                            ['33', 50],
                            ['33.5', 51],
                            ['34', 52],
                            ['34.5', 53],
                            ['35', 54],
                            ['35.5', 53],
                            ['36', 53],
                            ['36.5', 52],
                            ['37', 51],
                            ['37.5', 50],
                            ['38', 48],
                            ['38.5', 47],
                            ['39', 46],
                            ['39.5', 45],
                            ['40', 46]
                        ]
                    }
                ]
            };


        }

    }

}
