import { Component, OnInit } from '@angular/core';
import { Resident } from '../../model/resident.entity';
import { ResidentDetails} from '../../model/residentDetails.entity'; // ✅ modelo con historial y medicación
import { ResidentService } from '../../services/resident.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog-component/confirm-dialog-component.component';
import { ResidentDetailDialogComponent } from '../resident-detail-dialog/resident-detail-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resident-care-management',
  templateUrl: './resident-care-management.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    DatePipe,
    NgIf,
    MatSnackBarModule
  ],
  styleUrls: ['./resident-care-management.component.css']
})
export class ResidentCareManagementComponent implements OnInit {
  residents: Resident[] = [];
  residentForm!: FormGroup;
  editingResidentId: number | null = null;

  constructor(
    private residentService: ResidentService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadResidents();
    this.initForm();
  }

  initForm() {
    this.residentForm = this.fb.group({
      dni: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', Validators.required],
      receiptId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  loadResidents(): void {
    this.residentService.getAll().subscribe({
      next: (res) => this.residents = res,
      error: (err) => console.error('Failed to load residents', err),
    });
  }

  onSubmit(): void {
    if (this.residentForm.invalid) return;

    const formValue = this.residentForm.value;
    const payload = {
      ...formValue,
      receiptId: Number(formValue.receiptId)
    };

    if (this.editingResidentId === null) {
      this.residentService.create(payload).subscribe({
        next: (created) => {
          this.residents.push(created);
          this.residentForm.reset();
          this.editingResidentId = null;
        },
        error: (err) => console.error('Failed to create resident', err)
      });
    } else {
      this.residentService.update(this.editingResidentId, payload).subscribe({
        next: (updated) => {
          const index = this.residents.findIndex(r => r.id === this.editingResidentId);
          if (index !== -1) this.residents[index] = updated;
          this.cancelEdit();
        },
        error: (err) => console.error('Failed to update resident', err)
      });
    }
  }

  editResident(resident: Resident): void {
    this.editingResidentId = resident.id!;
    this.residentForm.patchValue(resident);
  }

  deleteResident(id: number | undefined): void {
    if (!id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete Resident',
        message: 'Are you sure you want to delete this resident?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.residentService.delete(id).subscribe({
          next: () => {
            this.residents = this.residents.filter(r => r.id !== id);
            this.snackBar.open('El residente se eliminó correctamente.', 'Cerrar', {
              duration: 3000,
              panelClass: 'custom-snackbar'
            });
          },
          error: (err) => console.error('Failed to delete resident', err)
        });
      }
    });
  }

  cancelEdit(): void {
    this.editingResidentId = null;
    this.residentForm.reset();
  }

  viewMedications(resident: Resident): void {
    this.loadResidentDetails(resident);
  }

  viewMedicalHistory(resident: Resident): void {
    this.loadResidentDetails(resident);
  }

  viewMentalHealthRecords(resident: Resident): void {
    this.loadResidentDetails(resident);
  }

  private loadResidentDetails(resident: Resident): void {
    this.residentService.getResidentDetails(resident.id!).subscribe({
      next: (res: ResidentDetails) => {
        this.dialog.open(ResidentDetailDialogComponent, {
          width: '500px',
          data: {
            name: `${res.name} ${res.lastName}`,
            medications: res.medications || [],
            medicalHistories: res.medicalHistories || [],
            mentalHealthRecords: res.mentalHealthRecords || []
          }
        });
      },
      error: (err) => console.error('Failed to load resident details', err)
    });
  }
}
