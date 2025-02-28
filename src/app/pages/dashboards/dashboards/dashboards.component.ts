import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { DbService } from '../../../shared/services/db.service';
import { Dashboard } from '../../../shared/types/db/auto/Dashboard';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';

@Component({
    selector: 'app-dashboards',
    templateUrl: './dashboards.component.html',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        BreadcrumbComponent,
        RouterModule,
    ]
})
export class DashboardsComponent implements OnInit {

    dashboards: Dashboard[] = [];
    dashboardsLoading: boolean = false;

    constructor(
        private _dbService: DbService,
        private _matDialog: MatDialog,
    ) {

    }

    ngOnInit(): void {
        this.loadDashboards();
    }

    //#region Table
    loadDashboards(): void {
        this.dashboardsLoading = true;
        this._dbService.readList(new Dashboard()).subscribe({
            next: response => {
                this.dashboards = response.rows as Dashboard[];
                this.dashboardsLoading = false;
            },
            error: error => {
                this.dashboards = [];
                this.dashboardsLoading = false;
            }
        });
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
                this.loadDashboards();
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
                this.loadDashboards();
            }
        });
    }
    //#endregion

}
