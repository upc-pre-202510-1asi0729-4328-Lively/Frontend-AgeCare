import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private apiUrl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  create(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, status: Appointment['status']): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.apiUrl}/${id}`, { status });
  }
}
