import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../model/doctor.model';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {
  @Output() created = new EventEmitter<Doctor>();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: DoctorService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName:     ['', Validators.required],
      lastName:      ['', Validators.required],
      licenseNumber: ['', Validators.required],
      specialty:     ['', Validators.required],
      phone:         ['', Validators.required],
      street:        [''],
      city:          [''],
      state:         [''],
      zipCode:       [''],
      country:       ['']
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const v = this.form.value;
    const newDoc: Doctor = {
      id: 0,
      fullName: {
        firstName: v.firstName,
        lastName:  v.lastName
      },
      licenseNumber: v.licenseNumber,
      specialty:     v.specialty,
      contactInfo: {
        phone: v.phone,
        address: {
          street:  v.street,
          city:    v.city,
          state:   v.state,
          zipCode: v.zipCode,
          country: v.country
        }
      },
      schedules: []
    };
    this.svc.createDoctor(newDoc).subscribe(doc => {
      this.form.reset();
      this.created.emit(doc);
    });
  }
}
