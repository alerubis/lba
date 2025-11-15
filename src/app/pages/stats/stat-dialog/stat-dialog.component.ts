import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Inject } from '@angular/core';
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
import { Stat } from '../../../shared/types/db/auto/Stat';

export interface StatDialogData {
    action: 'create' | 'update' | 'delete';
    stat: Stat;
}

@Component({
    selector: 'app-stat-dialog',
    templateUrl: './stat-dialog.component.html',
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
export class StatDialogComponent{

    action: 'create' | 'update' | 'delete';
    stat: Stat;
    statForm: FormGroup;

    createLoading: boolean = false;
    updateLoading: boolean = false;
    deleteLoading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: StatDialogData,
        private _dialogRef: MatDialogRef<StatDialogComponent>,
        private _dbService: DbService,
    ) {
        this.action = this._data.action;
        this.stat = new Stat(this._data.stat);
        this.statForm = new FormGroup(this.stat.toFormGroup());
        if (this.action === 'update') {
            this.statForm.addControl('id', new FormControl());
            this.statForm.patchValue(this.stat);
        }
    }

    //#region Actions
    cancel(): void {
        this._dialogRef.close();
    }

    create(): void {
        if (this.statForm.invalid) {
            return;
        }
        this.createLoading = true;
        const stat = new Stat(this.statForm.getRawValue());
        this._dbService.create(stat).subscribe({
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
        if (this.statForm.invalid) {
            return;
        }
        this.updateLoading = true;
        const stat = new Stat(this.statForm.getRawValue());
        this._dbService.update(stat).subscribe({
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
        const stat = new Stat(this.statForm.getRawValue());
        this._dbService.delete(stat).subscribe({
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
