import { StatDialogComponent } from '../stat-dialog/stat-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { DbService } from '../../../shared/services/db.service';
import { Stat } from '../../../shared/types/db/auto/Stat';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        BreadcrumbComponent,
        RouterModule,
    ]
})
export class StatsComponent implements OnInit {

    stats: Stat[] = [];
    dataLoading: boolean = false;

    constructor(
        private _dbService: DbService,
        private _matDialog: MatDialog,
    ) {

    }

    ngOnInit(): void {
        this.loadData();
    }

    //#region Table
    async loadData(): Promise<void> {
        this.dataLoading = true;
        this.stats = await this._dbService.readList(new Stat()) as Stat[];
        this.dataLoading = false;
    }
    //#endregion

    //#endregion Actions
    updateFormula(stat: any): void {
        const dialogRef = this._matDialog.open(StatDialogComponent, {
            width: '90%',
            maxWidth: '640px',
            data: {
                action: 'update',
                stat: stat,
            },
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
                this.loadData();
            }
        });
    }
    //#endregion

}
