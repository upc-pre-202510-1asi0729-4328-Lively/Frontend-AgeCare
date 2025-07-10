import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Appointment } from '../../model/appointment.entity';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from '../appointment/appointment.component';
import { TranslateModule } from '@ngx-translate/core';

import { ResidentService } from '../../../../pages/resident-care-management/services/resident.service';
import { DoctorService } from '../../../user-management/services/doctor.service';
import { AppointmentService } from '../../services/appointment.service';
import { Resident } from '../../../../pages/resident-care-management/model/resident.entity';
import { Doctor } from '../../../../pages/user-management/model/doctor.model';

type EnrichedAppointment = Appointment & {
  residentName?: string;
  doctorName?: string;
};

@Component({
  selector: 'app-list-appointments',
  standalone: true,
  imports: [CommonModule, AppointmentComponent, TranslateModule],
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css']
})
export class ListAppointmentsComponent implements OnChanges {
  @Input() appointments: Appointment[] = [];
  @Input() searchQuery: string = '';
  @Input() readonly: boolean = false; 
  @Output() updateStatus = new EventEmitter<{ id: number; status: Appointment['status'] }>();
  @Output() delete = new EventEmitter<number>();

  enrichedAppointments: EnrichedAppointment[] = [];

  constructor(
    private residentService: ResidentService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appointments'] && this.appointments.length > 0) {
      this.enrichAppointments();
    }
  }

  enrichAppointments() {
    this.enrichedAppointments = [];

    this.appointments.forEach(app => {
      const enriched: EnrichedAppointment = { ...app };

      this.residentService.getById(app.residentId).subscribe({
        next: (resident: Resident) => {
          enriched.residentName = `${resident.firstName} ${resident.lastName}`;
        },
        error: () => {
          enriched.residentName = 'Desconocido';
        }
      });

      this.doctorService.getDoctorById(app.doctorId).subscribe({
        next: (doctor: Doctor) => {
          enriched.doctorName = `${doctor.fullName.firstName} ${doctor.fullName.lastName}`;
        },
        error: () => {
          enriched.doctorName = 'Desconocido';
        }
      });

      this.enrichedAppointments.push(enriched);
    });
  }

  get filteredAppointments(): EnrichedAppointment[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.enrichedAppointments;

    return this.enrichedAppointments.filter(app =>
      (app.residentName || '').toLowerCase().includes(query) ||
      (app.doctorName || '').toLowerCase().includes(query)
    );
  }

  emitUpdateStatus(event: { id: number; status: Appointment['status'] }) {
    this.updateStatus.emit(event);
  }

  emitDelete(id: number) {
    this.delete.emit(id);
  }

  emitUpdateAppointment(updated: Appointment) {
    this.appointmentService.update(updated.id, updated).subscribe({
      next: () => {
        console.log(`Cita con ID ${updated.id} actualizada exitosamente.`);
        // Refrescar la lista si es necesario (opcional)
        const index = this.enrichedAppointments.findIndex(a => a.id === updated.id);
        if (index !== -1) {
          this.enrichedAppointments[index] = {
            ...this.enrichedAppointments[index],
            ...updated
          };
        }
      },
      error: err => {
        console.error(`Error al actualizar la cita con ID ${updated.id}`, err);
      }
    });
  }
}
