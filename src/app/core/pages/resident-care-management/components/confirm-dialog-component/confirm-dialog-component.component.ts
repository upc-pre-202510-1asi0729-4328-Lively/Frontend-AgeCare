import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog-component.component.html',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ],
  styleUrls: ['./confirm-dialog-component.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
