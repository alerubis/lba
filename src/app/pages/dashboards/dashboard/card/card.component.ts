import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DbService } from '../../../../shared/services/db.service';
import { DashboardCard } from '../../../../shared/types/db/auto/DashboardCard';
import { CardSettingsDialogComponent } from './card-settings-dialog/card-settings-dialog.component';
import { DashboardCardSettings } from '../../../../shared/types/db/auto/DashboardCardSettings';
import { GraficCardComponent } from './custom-cards/grafic-card/grafic-card.component';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    standalone: true,
    imports: [
    MatIconModule,
    MatButtonModule,
    GraficCardComponent
],
})
export class CardComponent {

    @Input() edit: boolean = false;
    @Input({ required: true }) dashboardCard!: DashboardCard;
    @Input({ required: true }) dashboardCardSettings!: DashboardCardSettings[];
    @Input() gameId: number | undefined;
    @Input() playerId: number | undefined;
    @Input() teamId: number | undefined;

    @Output() onCardUpdate: EventEmitter<any> = new EventEmitter();
    @Output() onCardDelete: EventEmitter<any> = new EventEmitter();

    constructor(
        private _dbService: DbService,
        private _matDialog: MatDialog,
    ) {

    }

    editCardSettings(): void {
        const dialogRef = this._matDialog.open(CardSettingsDialogComponent, {
            width: '90%',
            maxWidth: '640px',
            data: {
                dashboardCard: this.dashboardCard,
                dashboardCardSettings: this.dashboardCardSettings,
            },
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
                this.onCardUpdate.emit(response);
            }
        });
    }

    deleteCard(): void {
        this._dbService.delete(this.dashboardCard).subscribe((response: any) => {
            this.onCardDelete.emit(response);
        });
    }

}
