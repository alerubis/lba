import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GridStackOptions } from 'gridstack';
import { GridstackModule } from 'gridstack/dist/angular';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { DbService } from '../../../shared/services/db.service';
import { Dashboard } from '../../../shared/types/db/auto/Dashboard';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [
        BreadcrumbComponent,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatTabsModule,
        MatTooltipModule,
        GridstackModule,
    ]
})
export class DashboardComponent implements OnInit {

    dashboardId: number | undefined;
    dashboard: Dashboard | undefined;
    dashboardLoading: boolean = false;

    gridOptions: GridStackOptions = {
        margin: 8,
        marginUnit: 'px',
        children: [
            { x: 0, y: 0, minW: 2, minH: 2, content: 'Item 1' },
            { x: 2, y: 0, minW: 2, minH: 2, content: 'Item 2' },
            { x: 0, y: 2, minW: 2, minH: 2, content: 'Item 3' },
        ]
    };

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _dbService: DbService,
        private _matDialog: MatDialog,
        private _router: Router,
    ) {

    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const idFromParams = params.get('id');
            if (idFromParams) {
                this.dashboardId = +idFromParams;
            }
            this.loadDashboard();
        });
    }

    //#region Dashboard
    loadDashboard(): void {
        if (this.dashboardId) {
            this.dashboardLoading = true;
            this._dbService.readFromId(new Dashboard(), this.dashboardId).subscribe({
                next: response => {
                    this.dashboard = response;
                    this.dashboardLoading = false;
                },
                error: error => {
                    this.dashboard = undefined;
                    this.dashboardLoading = false;
                }
            });
        }
    }

    updateDashboard(dashboard: Dashboard | undefined): void {
        if (!dashboard) {
            return;
        }

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
                if (response === 'delete') {
                    this._router.navigate(['/pages/dashboards/']);
                } else {
                    this.loadDashboard();
                }
            }
        });
    }
    //#endregion

}
