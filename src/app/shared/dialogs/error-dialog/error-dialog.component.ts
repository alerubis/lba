import { DragDropModule } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

export interface ErrorDialogData {
    message: string;
    error: any;
}

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html',
    standalone: true,
    imports: [
        DragDropModule,
        JsonPipe,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
    ]
})
export class ErrorDialogComponent {

    message: string = '';
    error: any = '';
    showFullError: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: ErrorDialogData,
        private _dialogRef: MatDialogRef<ErrorDialogComponent>,
    ) {
        this.message = this._data.message;
        this.error = this._data.error;
    }

    //#region Actions
    cancel(): void {
        this._dialogRef.close();
    }

    ok(): void {
        this._dialogRef.close(true);
    }
    //#endregion

}
