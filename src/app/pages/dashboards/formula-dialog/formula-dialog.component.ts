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
import { Formula } from '../../../shared/types/db/auto/Formula';

export interface FormulaDialogData {
    action: 'create' | 'update' | 'delete';
    formula: Formula;
}

@Component({
    selector: 'app-formula-dialog',
    templateUrl: './formula-dialog.component.html',
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
export class FormulaDialogComponent{

    action: 'create' | 'update' | 'delete';
    formula: Formula;
    formulaForm: FormGroup;
    cardType: CardType[] = [];

    createLoading: boolean = false;
    updateLoading: boolean = false;
    deleteLoading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: FormulaDialogData,
        private _dialogRef: MatDialogRef<FormulaDialogComponent>,
        private _dbService: DbService,
    ) {
        this.action = this._data.action;
        this.formula = new Formula(this._data.formula);
        this.formulaForm = new FormGroup(this.formula.toFormGroup());
        if (this.action === 'update') {
            this.formulaForm.addControl('id', new FormControl());
            this.formulaForm.patchValue(this.formula);
        }
    }

    //#region Actions
    cancel(): void {
        this._dialogRef.close();
    }

    create(): void {
        if (this.formulaForm.invalid) {
            return;
        }
        this.createLoading = true;
        const formula = new Formula(this.formulaForm.getRawValue());
        this._dbService.create(formula).subscribe({
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
        if (this.formulaForm.invalid) {
            return;
        }
        this.updateLoading = true;
        const formula = new Formula(this.formulaForm.getRawValue());
        this._dbService.update(formula).subscribe({
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
        const formula = new Formula(this.formulaForm.getRawValue());
        this._dbService.delete(formula).subscribe({
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
