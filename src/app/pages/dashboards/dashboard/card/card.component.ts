import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DbService } from '../../../../shared/services/db.service';
import { DashboardCard } from '../../../../shared/types/db/auto/DashboardCard';
import { CardSettingsDialogComponent } from './card-settings-dialog/card-settings-dialog.component';
import { DashboardCardSettings } from '../../../../shared/types/db/auto/DashboardCardSettings';
import { GraficCardComponent } from './custom-cards/grafic-card/grafic-card.component';
import html2canvas from 'html2canvas';
import { ElementRef, ViewChild } from '@angular/core';

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
export class CardComponent{

    @Input() edit: boolean = false;
    @Input({ required: true }) dashboardCard!: DashboardCard;
    @Input({ required: true }) dashboardCardSettings!: DashboardCardSettings[];
    @Input() gameId: number | undefined;
    @Input() gameIds: number[] = [];
    @Input() playerId: number | undefined;
    @Input() teamId: number | undefined;
    @Input() playerIds: number[] = [];
    @Input() playerOutIds: number[] = [];

    @Output() onCardUpdate: EventEmitter<any> = new EventEmitter();
    @Output() onCardDelete: EventEmitter<any> = new EventEmitter();
    @ViewChild('cardContainer', { static: false }) cardContainerRef!: ElementRef;

    constructor(
        private _dbService: DbService,
        private _matDialog: MatDialog,
    ) {

    }
    
    arraysEqual(arr1: number[], arr2: number[]): boolean {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, index) => val === arr2[index]);
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
    async salvaCardComeImmagine(): Promise<void> {
        if (!this.cardContainerRef?.nativeElement) return;
    
        const element = this.cardContainerRef.nativeElement;
    
        const canvas = await html2canvas(this.cardContainerRef.nativeElement, {
            backgroundColor: '#ffffff', // colore semplice compatibile
            useCORS: true,
            ignoreElements: (el) => {
                const style = getComputedStyle(el);
                return style.backgroundColor.includes('oklch');
            }
        });        
    
        const base64Image = canvas.toDataURL('image/png');
    
        // ESEMPIO 1: scarica subito il file
        const link = document.createElement('a');
        link.href = base64Image;
        link.download = `snapshot-${this.dashboardCard.card_id}.png`;
        link.click();
    
        // ESEMPIO 2: salvalo nel localStorage (facoltativo)
        // localStorage.setItem(`snapshot-${this.dashboardCard.card_id}`, base64Image);
    }
    

}
