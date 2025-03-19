import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DbService } from '../../../../shared/services/db.service';
import { DashboardCard } from '../../../../shared/types/db/auto/DashboardCard';
import { CardSettingsDialogComponent } from './card-settings-dialog/card-settings-dialog.component';
import { LinePlayPlayerCardComponent } from './custom-cards/line-play-player/line-play-player-card.component';
import { DashboardCardSettings } from '../../../../shared/types/db/auto/DashboardCardSettings';
import { LinePlayTeamCardComponent } from "./custom-cards/line-play-team/line-play-team-card.component";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    standalone: true,
    imports: [
    MatIconModule,
    MatButtonModule,
    LinePlayPlayerCardComponent,
    LinePlayTeamCardComponent
],
})
export class CardComponent {

    @Input({ required: true }) dashboardCard!: DashboardCard;
    @Input({ required: true }) dashboardCardSettings!: DashboardCardSettings[];

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
