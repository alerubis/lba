import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DbService } from '../../../../../shared/services/db.service';
import { CardSettings } from '../../../../../shared/types/db/auto/CardSettings';
import { DashboardCard } from '../../../../../shared/types/db/auto/DashboardCard';
import { DashboardCardSettings } from '../../../../../shared/types/db/auto/DashboardCardSettings';
import { MatSelectModule } from '@angular/material/select';
import { Formula } from '../../../../../shared/types/db/auto/Formula';

export interface CardSettingsDialogData {
    dashboardCard: DashboardCard;
    dashboardCardSettings: DashboardCardSettings[];
}

@Component({
    selector: 'app-card-settings-dialog',
    templateUrl: './card-settings-dialog.component.html',
    standalone: true,
    imports: [
        DragDropModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        FormsModule,
        MatSelectModule,
    ]
})
export class CardSettingsDialogComponent implements OnInit{

    dashboardCard: DashboardCard;
    dashboardCardSettings: DashboardCardSettings[];
    cardSettings: CardSettings[] = [];
    formulas: Formula[] = [];

    dataLoading: boolean = false;
    updateLoading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: CardSettingsDialogData,
        private _dialogRef: MatDialogRef<CardSettingsDialogComponent>,
        private _dbService: DbService,
    ) {
        this.dashboardCard = new DashboardCard(this._data.dashboardCard);
        this.dashboardCardSettings = this._data.dashboardCardSettings.map(x => new DashboardCardSettings(x));
    }

    ngOnInit(): void {
        this.loadData();
    }

    async loadData(): Promise<void> {
        this.dataLoading = true;
        this.cardSettings = await this._dbService.readList(new CardSettings(), { card_id: this.dashboardCard.card_id }) as CardSettings[];
        this.formulas = await this._dbService.readList(new Formula()) as Formula[];
        this.dataLoading = false;
    }

    getSettingPossibleValues(setting: DashboardCardSettings): string[] {
        let possibleValues = [];
        const cardSetting = this.cardSettings.find(x => x.setting_id === setting.setting_id);
        if (cardSetting && cardSetting.possible_values) {
            possibleValues = cardSetting.possible_values;
        }
        return [...this.formulas.map(x=>x.name), ...possibleValues];
    }

    //#region Actions
    cancel(): void {
        this._dialogRef.close();
    }

    update(): void {
        this.updateLoading = true;
        this._dbService.update(this.dashboardCard, { dashboardCardSettings: this.dashboardCardSettings }).subscribe({
            next: (r: any) => {
                this.updateLoading = false;
                this._dialogRef.close('update');
            },
            error: (e: any) => {
                this.updateLoading = false;
            }
        });
    }

    restoreDefaults(): void {
        this.dashboardCardSettings = [];
        for (const cardSetting of this.cardSettings) {
            const dashboardCardSetting = new DashboardCardSettings();
            dashboardCardSetting.dashboard_id = this.dashboardCard.dashboard_id;
            dashboardCardSetting.dashboard_card_id = this.dashboardCard.dashboard_card_id;
            dashboardCardSetting.card_id = cardSetting.card_id;
            dashboardCardSetting.setting_id = cardSetting.setting_id;
            dashboardCardSetting.value = cardSetting.default_value;
            this.dashboardCardSettings.push(dashboardCardSetting);

        }
    }
    //#endregion

}
