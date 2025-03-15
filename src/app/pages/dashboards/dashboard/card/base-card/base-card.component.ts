import { TeamYearLeagueSummaryMinutesQuarter } from './../../../../../shared/types/db/auto/TeamYearLeagueSummaryMinutesQuarter';
import { TeamYearLeagueSummaryMinutesGame } from './../../../../../shared/types/db/auto/TeamYearLeagueSummaryMinutesGame';
import { User } from './../../../../../shared/types/db/auto/User';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DashboardCard } from '../../../../../shared/types/db/auto/DashboardCard';
import { DashboardCardSettings } from '../../../../../shared/types/db/auto/DashboardCardSettings';
import { DbService } from '../../../../../shared/services/db.service';
import { CardSettings } from '../../../../../shared/types/db/auto/CardSettings';
import { TeamYearLeagueSummarySecondsPlay } from '../../../../../shared/types/db/auto/TeamYearLeagueSummarySecondsPlay';

@Component({
    selector: 'app-base-card',
    templateUrl: './base-card.component.html',
    standalone: true,
})
export class BaseCardComponent implements OnInit, OnChanges {

    @Input({ required: true }) dashboardCard!: DashboardCard;
    @Input({ required: true }) dashboardCardSettings!: DashboardCardSettings[];
    cardSettings: CardSettings[] = [];
    cardSettingsTable!: CardSettings | undefined;
    cardSettingsFilter: CardSettings[] = [];
    cardSettingsColumn: CardSettings[] = [];

    dati: any[] = [];

    constructor(
        private _dbService: DbService,
    ) {

    }

    //#region Table
    ngOnInit(): void {
        this.loadData();
        this.loadChartOption();
    }

    async loadData(): Promise<void> {
        this.cardSettings = await this._dbService.readList(new CardSettings()) as CardSettings[];
        this.cardSettings = await this._dbService.readList(new CardSettings(), { card_id: this.dashboardCard.card_id }) as CardSettings[];

        this.cardSettingsTable = this.cardSettings.find(x=>x.card_settings_type_id === "TABLE");
        this.cardSettingsColumn = this.cardSettings.filter(x=>x.card_settings_type_id === "COLUMN");
        this.cardSettingsFilter = this.cardSettings.filter(x=>x.card_settings_type_id === "FILTER");

        const x = this.dashboardCardSettings.find((setting) => setting.setting_id === 'X')?.value;
        const y = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Y')?.value;
        const filter = this.dashboardCardSettings.find((setting) => setting.setting_id === 'Filter')?.value;


        if (x === "team_year_league_summary_seconds_play"){
            if (filter === "team"){
                this.dati = await this._dbService.readList(new TeamYearLeagueSummarySecondsPlay(), { team_id: '1', league_year_id: '1' }) as TeamYearLeagueSummarySecondsPlay[];
            }
        }
        if (x === "team_year_league_summary_minutes_quart"){
            if (filter === "team"){
                this.dati = await this._dbService.readList(new TeamYearLeagueSummaryMinutesQuarter(), { team_id: '1', league_year_id: '1' }) as TeamYearLeagueSummaryMinutesQuarter[];
            }
        }
        if (x === "team_year_league_summary_minutes_game"){
            if (filter === "team"){
                this.dati = await this._dbService.readList(new TeamYearLeagueSummaryMinutesGame(), { team_id: '1', league_year_id: '1' }) as TeamYearLeagueSummaryMinutesGame[];
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadChartOption();
    }

    loadChartOption(): void {

    }

}
