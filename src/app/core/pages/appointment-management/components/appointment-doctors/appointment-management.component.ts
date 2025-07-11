import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../model/appointment.entity';
import { AppointmentService } from '../../services/appointment.service';
import { ListAppointmentsComponent } from '../appointments-list/appointments-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-appointment-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ListAppointmentsComponent, TranslateModule],
  templateUrl: './appointment-management.component.html',
  styleUrls: ['./appointment-management.component.css']
})
export class AppointmentManagementComponent implements OnInit {
  appointments: Appointment[] = [];

  newAppointment = {
    date: '',
    time: '', 
    residentId: null as number | null,
    doctorId: null as number | null
  };

  searchQuery: string = '';
  showConfirmDeleteId: number | null = null;
  pendingStatusChange: { id: number; status: Appointment['status'] } | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  get filteredAppointments(): Appointment[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.appointments;

    return this.appointments.filter(a =>
      (a.residentName || '').toLowerCase().includes(query) ||
      (a.doctorName || '').toLowerCase().includes(query)
    );
  }

  loadAppointments() {
    this.appointmentService.getAll().subscribe(data => {
      this.appointments = data;
    });
  }

  createAppointment() {
    const { date, time, residentId, doctorId } = this.newAppointment;

    if (!date || !time || !residentId || !doctorId) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const [hourStr, minuteStr] = time.split(':');
    if (!hourStr || !minuteStr) {
      alert('Formato de hora inválido.');
      return;
    }

    const appointment: Omit<Appointment, 'id'> = {
      date,
      time,
      residentId: Number(residentId),
      doctorId: Number(doctorId),
      status: 'Pending'
    };

    this.appointmentService.create(appointment).subscribe({
      next: () => {
        this.newAppointment = { date: '', time: '', residentId: null, doctorId: null };
        this.loadAppointments();
      },
      error: (err) => {
        console.error('Error al crear cita:', err);
        alert('Ocurrió un error al crear la cita. Verifica que los IDs existan.');
      }
    });
  }

  confirmDelete(id: number) {
    this.showConfirmDeleteId = id;
  }

  cancelDelete() {
    this.showConfirmDeleteId = null;
  }

  deleteAppointment(id: number) {
    this.appointmentService.delete(id).subscribe(() => {
      this.showConfirmDeleteId = null;
      this.loadAppointments();
    });
  }

  requestStatusChange(event: { id: number; status: Appointment['status'] }) {
    const appointment = this.appointments.find(a => a.id === event.id);
    if (!appointment) return;

    const updated: Appointment = {
      ...appointment,
      status: event.status
    };

    delete (updated as any).residentName;
    delete (updated as any).doctorName;

    this.appointmentService.update(event.id, updated).subscribe(() => {
      this.loadAppointments();
    });
  }

  confirmStatusChange() {
    if (!this.pendingStatusChange) return;
    const { id, status } = this.pendingStatusChange;

    const appointment = this.appointments.find(a => a.id === id);
    if (!appointment) return;

    const updated: Appointment = { ...appointment, status };

    delete (updated as any).residentName;
    delete (updated as any).doctorName;

    this.appointmentService.update(id, updated).subscribe(() => {
      this.pendingStatusChange = null;
      this.loadAppointments();
    });
  }

  cancelStatusChange() {
    this.pendingStatusChange = null;
  }
}
