import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NewMemberFormComponent } from '../new-member-form/new-member-form.component';

@Component({
    selector: 'new-member-dialog',
    templateUrl: './new-member-dialog.component.html',
    styleUrls: ['./new-member-dialog.component.scss']
})
export class NewMemberDialogComponent {

    constructor(public dialogRef: MatDialogRef<NewMemberDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        public dialog: MatDialog) {}

    newAdult() {
        this.dialogRef.close();
        this.dialog.open(NewMemberFormComponent, {
            data: 'adult'
        });
    }

    newChild() {
        this.dialogRef.close();
        this.dialog.open(NewMemberFormComponent, {
            height: '660px',
            data: 'child'
        });
    }
}