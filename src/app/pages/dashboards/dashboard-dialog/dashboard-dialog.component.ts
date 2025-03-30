import { Dashboard } from './../../../shared/types/db/auto/Dashboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DbService } from '../../../shared/services/db.service';
import { CardType } from '../../../shared/types/db/auto/CardType';

export interface DashboardDialogData {
    action: 'create' | 'update' | 'delete';
    dashboard: Dashboard;
}

@Component({
    selector: 'app-dashboard-dialog',
    templateUrl: './dashboard-dialog.component.html',
    standalone: true,
    imports: [
        DragDropModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatToolbarModule,
        ReactiveFormsModule,
    ]
})
export class DashboardDialogComponent implements OnInit{

    action: 'create' | 'update' | 'delete';
    dashboard: Dashboard;
    dashboardForm: FormGroup;
    cardType: CardType[] = [];

    createLoading: boolean = false;
    updateLoading: boolean = false;
    deleteLoading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: DashboardDialogData,
        private _dialogRef: MatDialogRef<DashboardDialogComponent>,
        private _dbService: DbService,
    ) {
        this.action = this._data.action;
        this.dashboard = new Dashboard(this._data.dashboard);
        this.dashboardForm = new FormGroup(this.dashboard.toFormGroup());
        if (this.action === 'update') {
            this.dashboardForm.addControl('id', new FormControl());
            this.dashboardForm.patchValue(this.dashboard);
        }
    }

    async ngOnInit(): Promise<void> {
        this.cardType = await this._dbService.readList(new CardType()) as CardType[];
    }
    //#region Actions
    cancel(): void {
        this._dialogRef.close();
    }

    create(): void {
        if (this.dashboardForm.invalid) {
            return;
        }
        this.createLoading = true;
        const dashboard = new Dashboard(this.dashboardForm.getRawValue());
        dashboard.team_id = 1649;
        this._dbService.create(dashboard).subscribe({
            next: (r: any) => {
                this.createLoading = false;
                this._dialogRef.close(true);
            },
            error: (e: any) => {
                this.createLoading = false;
            }
        });
    }

    update(): void {
        if (this.dashboardForm.invalid) {
            return;
        }
        this.updateLoading = true;
        const dashboard = new Dashboard(this.dashboardForm.getRawValue());
        this._dbService.update(dashboard).subscribe({
            next: (r: any) => {
                this.updateLoading = false;
                this._dialogRef.close('update');
            },
            error: (e: any) => {
                this.updateLoading = false;
            }
        });
    }

    delete(): void {
        this.deleteLoading = true;
        const dashboard = new Dashboard(this.dashboardForm.getRawValue());
        this._dbService.delete(dashboard).subscribe({
            next: (r: any) => {
                this.deleteLoading = false;
                this._dialogRef.close('delete');
            },
            error: (e: any) => {
                this.deleteLoading = false;
            }
        });
    }
    //#endregion

}
