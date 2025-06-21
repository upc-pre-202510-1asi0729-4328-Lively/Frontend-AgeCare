import { Component, OnInit } from '@angular/core';
import { Resident } from '../../model/resident.entity';
import { ResidentService } from '../../services/resident.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog-component/confirm-dialog-component.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


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
      next: (res) => {
        this.residents = res;
        console.log("Loaded residents:", this.residents);
      },
      error: (err) => console.error('Failed to load residents', err),
    });
  }

  onSubmit(): void {
    if (this.residentForm.invalid) {
      console.error("Form is invalid");
      return;
    }

    const formValue = this.residentForm.value;

    const payload = {
      dni: formValue.dni,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      city: formValue.city,
      state: formValue.state,
      country: formValue.country,
      street: formValue.street,
      zipCode: formValue.zipCode,
      birthDate: formValue.birthDate,
      gender: formValue.gender,
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
          if (index !== -1) {
            this.residents[index] = updated;
          }
          this.cancelEdit();
        },
        error: (err) => console.error('Failed to update resident', err)
      });
    }
  }

  editResident(resident: Resident): void {
    if (!resident.id) {
      console.error("Invalid resident selected for editing");
      return;
    }

    this.editingResidentId = resident.id;

    this.residentForm.patchValue({
      dni: resident.dni,
      firstName: resident.firstName,
      lastName: resident.lastName,
      birthDate: resident.birthDate,
      gender: resident.gender,
      city: resident.city,
      state: resident.state,
      country: resident.country,
      street: resident.street,
      zipCode: resident.zipCode,
      receiptId: resident.receiptId
    });
  }

  deleteResident(id: number | undefined): void {
    if (id === undefined || id === null) {
      console.error("Invalid resident ID for delete");
      return;
    }

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
      } else {
        console.log("Deletion cancelled.");
      }
    });
  }

  cancelEdit(): void {
    this.editingResidentId = null;
    this.residentForm.reset();
  }

  viewMedications(resident: Resident): void {
    console.log(`Viewing medications for ${resident.firstName} ${resident.lastName}`);
  }

  viewMedicalHistory(resident: Resident): void {
    console.log(`Viewing medical history for ${resident.firstName} ${resident.lastName}`);
  }

  viewMentalHealthRecords(resident: Resident): void {
    console.log(`Viewing mental health records for ${resident.firstName} ${resident.lastName}`);
  }
}
