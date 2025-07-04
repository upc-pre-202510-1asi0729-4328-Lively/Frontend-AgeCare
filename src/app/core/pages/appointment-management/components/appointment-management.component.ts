import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../model/appointment.entity';
import { AppointmentsService } from '../../../services/appointments.service';
import { ListAppointmentsComponent } from '../../../components/appointments-list/appointments-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-appointment-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ListAppointmentsComponent, TranslateModule],
  templateUrl: './appointment-management.component.html',
  styleUrls: ['./appointment-management.component.css']
})
export class AppointmentManagementComponent implements OnInit {
  appointments: Appointment[] = [];
  newAppointment: Omit<Appointment, 'id'> = {
    date: '',
    time: '',
    resident: '',
    doctor: '',
    status: 'pending'
  };

  showConfirmDeleteId: string | null = null;
  pendingStatusChange: { id: string; status: Appointment['status'] } | null = null;

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentsService.getAll().subscribe(a => this.appointments = a);
  }

  createAppointment() {
    const { date, time, resident, doctor } = this.newAppointment;
    if (!date || !time || !resident || !doctor) return;

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      ...this.newAppointment
    };

    this.appointmentsService.create(appointment).subscribe(() => {
      this.newAppointment = { date: '', time: '', resident: '', doctor: '', status: 'pending' };
      this.loadAppointments();
    });
  }

  confirmDelete(id: string) {
    this.showConfirmDeleteId = id;
  }

  cancelDelete() {
    this.showConfirmDeleteId = null;
  }

  deleteAppointment(id: string) {
    this.appointmentsService.delete(id).subscribe(() => {
      this.showConfirmDeleteId = null;
      this.loadAppointments();
    });
  }

  requestStatusChange(event: { id: string, status: Appointment['status'] }) {
    this.pendingStatusChange = event;
  }

  confirmStatusChange() {
    if (!this.pendingStatusChange) return;
    const { id, status } = this.pendingStatusChange;

    this.appointmentsService.updateStatus(id, status).subscribe(() => {
      this.pendingStatusChange = null;
      this.loadAppointments();
    });
  }

  cancelStatusChange() {
    this.pendingStatusChange = null;
  }
}
