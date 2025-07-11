import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Doctor } from '../../model/doctor.model';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-edit-doctor-modal',
  templateUrl: './edit-doctor-modal.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./edit-doctor-modal.component.css']
})
export class EditDoctorModalComponent implements OnInit {
  @Input() doctor!: Doctor;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: DoctorService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [this.doctor.fullName.firstName, Validators.required],
      lastName:  [this.doctor.fullName.lastName,  Validators.required],
      licenseNumber: [this.doctor.licenseNumber, Validators.required],
      specialty:     [this.doctor.specialty,    Validators.required],
      phone:         [this.doctor.contactInfo.phone, Validators.required]
    });
  }

  save() {
    if (this.form.invalid) return;
    const { firstName, lastName, licenseNumber, specialty, phone } = this.form.value;
    const updated: Doctor = {
      ...this.doctor,
      fullName: { firstName, lastName },
      licenseNumber,
      specialty,
      contactInfo: { ...this.doctor.contactInfo, phone }
    };
    this.svc.updateDoctor(updated).subscribe(() => this.activeModal.close(updated));
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
