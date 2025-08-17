import { FormulaDialogComponent, FormulaDialogData } from './../formula-dialog/formula-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { DbService } from '../../../shared/services/db.service';
import { Dashboard } from '../../../shared/types/db/auto/Dashboard';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';
import { Formula } from '../../../shared/types/db/auto/Formula';

@Component({
    selector: 'app-dashboards',
    templateUrl: './dashboards.component.html',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        BreadcrumbComponent,
        RouterModule,
    ]
})
export class DashboardsComponent implements OnInit {

    dashboards: Dashboard[] = [];
    formulas: Formula[] = [];
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
        this.dashboards = await this._dbService.readList(new Dashboard()) as Dashboard[];
        this.formulas = await this._dbService.readList(new Formula()) as Formula[];
        this.dataLoading = false;
    }
    //#endregion

    //#endregion Actions
    createDashboard(): void {
        const dialogRef = this._matDialog.open(DashboardDialogComponent, {
            width: '90%',
            maxWidth: '640px',
            data: {
                action: 'create',
            },
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
                this.loadData();
            }
        });
    }
    createFormula(): void {
        const dialogRef = this._matDialog.open(FormulaDialogComponent, {
            width: '90%',
            maxWidth: '640px',
            data: {
                action: 'create',
            },
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
                this.loadData();
            }
        });
    }

    updateDashboard(dashboard: any): void {
        const dialogRef = this._matDialog.open(DashboardDialogComponent, {
            width: '90%',
            maxWidth: '640px',
            data: {
                action: 'update',
                dashboard: dashboard,
            },
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response) {
                this.loadData();
            }
        });
    }
    updateFormula(formula: any): void {
        const dialogRef = this._matDialog.open(FormulaDialogComponent, {
            width: '90%',
            maxWidth: '640px',
            data: {
                action: 'update',
                formula: formula,
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
