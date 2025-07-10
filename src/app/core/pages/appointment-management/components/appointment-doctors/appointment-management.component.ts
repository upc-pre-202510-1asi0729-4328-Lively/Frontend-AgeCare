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
    residentId: 0,
    doctorId: 0
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

    if (!date || !time || !residentId || !doctorId) return;

    const [hourStr, minuteStr] = time.split(':');
    const appointment: Omit<Appointment, 'id'> = {
      date,
      time: {
        hour: parseInt(hourStr, 10),
        minute: parseInt(minuteStr, 10),
        second: 0,
        nano: 0
      },
      residentId,
      doctorId,
      status: 'Pending'
    };

    this.appointmentService.create(appointment).subscribe(() => {
      this.newAppointment = { date: '', time: '', residentId: 0, doctorId: 0 };
      this.loadAppointments();
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
    console.log('Llamando update con:', event); 

    const appointment = this.appointments.find(a => a.id === event.id);
    if (!appointment) return;

    const updated = { ...appointment, status: event.status };

    this.appointmentService.update(event.id, updated).subscribe(() => {
      console.log('Actualización exitosa'); 
      this.loadAppointments();
    });
  }


  confirmStatusChange() {
    if (!this.pendingStatusChange) return;
    const { id, status } = this.pendingStatusChange;

    const appointment = this.appointments.find(a => a.id === id);
    if (!appointment) return;

    const updated = { ...appointment, status };

    this.appointmentService.update(id, updated).subscribe(() => {
      this.pendingStatusChange = null;
      this.loadAppointments();
    });
  }

  cancelStatusChange() {
    this.pendingStatusChange = null;
  }
}
