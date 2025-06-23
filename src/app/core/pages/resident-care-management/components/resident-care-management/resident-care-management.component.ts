import { Component, OnInit } from '@angular/core';
import { Resident } from '../../model/resident.entity';
import { ResidentService } from '../../services/resident.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-resident-care-management',
  templateUrl: './resident-care-management.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    DatePipe,
    NgIf
  ],
  styleUrls: ['./resident-care-management.component.css']
})
export class ResidentCareManagementComponent implements OnInit {
  residents: Resident[] = [];
  residentForm!: FormGroup;
  editingResidentId: number | null = null;

  constructor(
    private residentService: ResidentService,
    private fb: FormBuilder
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
    });
  }

  loadResidents(): void {
    this.residentService.getAll().subscribe({
      next: (res) => (this.residents = res),
      error: (err) => console.error('Failed to load residents', err),
    });
  }

  onSubmit(): void {
    if (this.residentForm.invalid) return;

    const formValue = this.residentForm.value;

    if (this.editingResidentId === null) {
      this.residentService.create(formValue).subscribe({
        next: (created) => {
          this.residents.push(created);
          this.residentForm.reset();
        },
        error: (err) => console.error('Failed to create resident', err)
      });
    } else {
      this.residentService.update(this.editingResidentId, formValue).subscribe({
        next: () => {
          const index = this.residents.findIndex(r => r.id === this.editingResidentId);
          if (index !== -1) {
            this.residents[index] = { id: this.editingResidentId, ...formValue };
          }
          this.cancelEdit();
        },
        error: (err) => console.error('Failed to update resident', err)
      });
    }
  }

  editResident(resident: Resident): void {
    this.editingResidentId = resident.id;
    this.residentForm.patchValue(resident);
  }

  deleteResident(id: number): void {
    this.residentService.delete(id).subscribe({
      next: () => {
        this.residents = this.residents.filter((r) => r.id !== id);
      },
      error: (err) => console.error('Failed to delete resident', err)
    });
  }

  cancelEdit(): void {
    this.editingResidentId = null;
    this.residentForm.reset();
  }

  viewMedications(resident: Resident): void {
    console.log(`Viewing medications for ${resident.firstName} ${resident.lastName}`);
    // Aquí podrías usar router.navigate(['/residents', resident.id, 'medications']);
  }

  viewMedicalHistory(resident: Resident): void {
    console.log(`Viewing medical history for ${resident.firstName} ${resident.lastName}`);
  }

  viewMentalHealthRecords(resident: Resident): void {
    console.log(`Viewing mental health records for ${resident.firstName} ${resident.lastName}`);
  }
}
