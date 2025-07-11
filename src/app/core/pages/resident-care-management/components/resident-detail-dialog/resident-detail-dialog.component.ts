import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions
} from '@angular/material/dialog';
import { Medication } from '../../model/medication.entity';
import { MedicalHistory } from '../../model/medicalHistory.entity';
import { MentalHealthRecord } from '../../model/mentalHealthRecord.entity';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-resident-detail-dialog',
  templateUrl: './resident-detail-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    NgForOf,
    NgIf,
    DatePipe,
    MatButton
  ],
  styleUrls: ['./resident-detail-dialog.component.css']
})
export class ResidentDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ResidentDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string;
      medications: Medication[];
      medicalHistories: MedicalHistory[];
      mentalHealthRecords: MentalHealthRecord[];
    }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
