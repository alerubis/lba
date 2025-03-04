import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DbService } from '../../../../../shared/services/db.service';
import { Card } from '../../../../../shared/types/db/auto/Card';
import { DashboardCard } from '../../../../../shared/types/db/auto/DashboardCard';
import { FormsModule } from '@angular/forms';

export interface CardSettingsDialogData {
    dashboardCard: DashboardCard;
    card: Card;
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
        MatProgressSpinnerModule,
        MatToolbarModule,
        FormsModule,
    ]
})
export class CardSettingsDialogComponent {

    dashboardCard: DashboardCard;
    card: Card;

    settings: string = '';
    updateLoading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: CardSettingsDialogData,
        private _dialogRef: MatDialogRef<CardSettingsDialogComponent>,
        private _dbService: DbService,
    ) {
        this.dashboardCard = this._data.dashboardCard;
        this.card = this._data.card;
        this.settings = JSON.stringify(this.dashboardCard.settings || this.card.default_settings);
    }

    //#region Actions
    cancel(): void {
        this._dialogRef.close();
    }

    update(): void {
        this.updateLoading = true;
        this.dashboardCard.settings = JSON.parse(this.settings);
        this._dbService.update(this.dashboardCard).subscribe({
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
        this.settings = JSON.stringify(this.card.default_settings);
    }
    //#endregion

}
