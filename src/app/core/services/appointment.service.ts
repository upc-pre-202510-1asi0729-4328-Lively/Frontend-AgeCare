import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment.entity';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private appointments: Appointment[] = [
    {
      id: 'a1',
      date: '2025-06-22',
      time: '10:00',
      resident: 'Juan Pérez',
      doctor: 'Dra. González',
      status: 'pending'
    },
    {
      id: 'a2',
      date: '2025-06-23',
      time: '14:30',
      resident: 'Ana Torres',
      doctor: 'Dr. House',
      status: 'completed'
    }
  ];

  getAll(): Observable<Appointment[]> {
    return of(this.appointments);
  }

  create(appointment: Appointment): Observable<Appointment> {
    this.appointments.push(appointment);
    return of(appointment);
  }

  delete(id: string): Observable<void> {
    this.appointments = this.appointments.filter(a => a.id !== id);
    return of();
  }

  updateStatus(id: string, status: Appointment['status']): Observable<Appointment | undefined> {
    const appt = this.appointments.find(a => a.id === id);
    if (appt) appt.status = status;
    return of(appt);
  }
}
