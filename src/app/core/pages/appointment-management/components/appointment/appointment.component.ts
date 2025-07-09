import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Appointment } from '../../model/appointment.entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Resident } from '../../../../pages/resident-care-management/model/resident.entity';
import { ResidentService } from '../../../../pages/resident-care-management/services/resident.service';

import { DoctorService } from '../../../user-management/services/doctor.service';
import { Doctor } from '../../../../pages/user-management/model/doctor.model';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  @Input() appointment!: Appointment;
  @Output() updateStatus = new EventEmitter<{ id: number, status: Appointment['status'] }>();
  @Output() delete = new EventEmitter<number>();

  statuses: Appointment['status'][] = ['Pending', 'Completed'];

  residentName: string = '';
  doctorName: string = '';

  private static residentCache = new Map<number, string>();
  private static doctorCache = new Map<number, string>();

  constructor(
    private residentService: ResidentService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    const resId = this.appointment.residentId;
    const docId = this.appointment.doctorId;

    // Obtener nombre del residente (con cache)
    if (AppointmentComponent.residentCache.has(resId)) {
      this.residentName = AppointmentComponent.residentCache.get(resId)!;
    } else {
      this.residentService.getById(resId).subscribe({
        next: (resident: Resident) => {
          const name = `${resident.firstName} ${resident.lastName}`;
          this.residentName = name;
          AppointmentComponent.residentCache.set(resId, name);
        },
        error: () => {
          this.residentName = 'Unknown';
        }
      });
    }

    // Obtener nombre del doctor (con cache)
    if (AppointmentComponent.doctorCache.has(docId)) {
      this.doctorName = AppointmentComponent.doctorCache.get(docId)!;
    } else {
      this.doctorService.getDoctorById(docId).subscribe({
        next: (doctor: Doctor) => {
          const name = `${doctor.fullName.firstName} ${doctor.fullName.lastName}`;
          this.doctorName = name;
          AppointmentComponent.doctorCache.set(docId, name);
        },
        error: () => {
          this.doctorName = 'Unknown';
        }
      });
    }
  }

  onUpdateStatus(event: any) {
    if (typeof event === 'string') {
      this.updateStatus.emit({ id: this.appointment.id, status: event as Appointment['status'] });
    }
  }

  onDelete() {
    this.delete.emit(this.appointment.id);
  }

  get formattedTime(): string {
    if (!this.appointment?.time) return '';
    const h = this.appointment.time.hour.toString().padStart(2, '0');
    const m = this.appointment.time.minute.toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  toggleStatus() {
    const newStatus = this.appointment.status === 'Pending' ? 'Completed' : 'Pending';
    this.updateStatus.emit({ id: this.appointment.id, status: newStatus });
  }
}
