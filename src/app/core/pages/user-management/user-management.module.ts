// src/app/core/pages/user-management/user-management.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { CreateDoctorComponent } from './components/create-doctor/create-doctor.component';
import { EditDoctorModalComponent } from './components/edit-doctor-modal/edit-doctor-modal.component';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';

@NgModule({
  declarations: [
    // ← nuevo

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModalModule,
    DoctorListComponent,
    CreateDoctorComponent,
    EditDoctorModalComponent,
    ConfirmDeleteModalComponent
  ],
  exports: [
    DoctorListComponent
  ]
})
export class UserManagementModule {}
