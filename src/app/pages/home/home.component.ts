import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface Item {
    title: string;
    link: string;
    image: string;
    subtitle: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        RouterLink,
    ]
})
export class HomeComponent {

    items: Item[] = [
        {
            title: 'Dashboard',
            link: '/pages/dashboards',
            image: 'images/stock/dashboard.jpg',
            subtitle: 'Get a detailed overview of performance with real-time data and up-to-date statistics. Monitor key metrics, optimize workflows, and make data-driven decisions to improve efficiency and outcomes.'
        },
        {
            title: 'Game analysis',
            link: '/pages/games',
            image: 'images/stock/game-analysis.jpg',
            subtitle: 'Dive deep into match analysis with advanced statistics and insights. Identify trends, strengths, and areas of improvement to refine strategies and gain a competitive edge.'
        },
        {
            title: 'Live',
            link: '/pages/live',
            image: 'images/stock/live.jpg',
            subtitle: 'Stay up-to-date with live events through real-time updates and broadcasts. Follow every crucial moment and never miss important plays or developments as they happen.'
        },
        {
            title: 'Scouting',
            link: '/pages/scouting',
            image: 'images/stock/scouting.jpg',
            subtitle: 'Identify emerging talents and evaluate player performance in depth. Use detailed insights to make informed decisions and strengthen your strategy for future growth and success.'
        }
    ];

}
