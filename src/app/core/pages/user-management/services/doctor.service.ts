// src/app/core/pages/user-management/services/doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../model/doctor.model';
import { Schedule } from '../model/schedule.model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  // Apunta al Swagger (localhost:8091/api/v1/doctors)
  private base = `${environment.serverBasePath}/doctors`;

  constructor(private http: HttpClient) {}

  /** GET  /api/v1/doctors */
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.base);
  }

  /** GET  /api/v1/doctors/{id} */
  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.base}/${id}`);
  }

  /** POST /api/v1/doctors */
  createDoctor(doc: Doctor): Observable<Doctor> {
    // El backend ignora el campo id en body
    return this.http.post<Doctor>(this.base, {
      licenseNumber: doc.licenseNumber,
      specialty:     doc.specialty,
      fullName:      doc.fullName,
      contactInfo:   doc.contactInfo
    });
  }

  /** PUT  /api/v1/doctors/{id} */
  updateDoctor(doc: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.base}/${doc.id}`, {
      licenseNumber: doc.licenseNumber,
      specialty:     doc.specialty,
      fullName:      doc.fullName,
      contactInfo:   doc.contactInfo
    });
  }

  /** DELETE  /api/v1/doctors/{id} */
  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  /** POST /api/v1/doctors/{id}/schedule */
  addSchedule(id: number, sched: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.base}/${id}/schedule`, sched);
  }

  /** PUT  /api/v1/doctors/{id}/schedules/{scheduleId} */
  updateSchedule(id: number, s: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(
      `${this.base}/${id}/schedules/${s.id}`,
      {
        day:           s.day,
        startTime:     s.startTime,
        endTime:       s.endTime,
        appointmentId: s.appointmentId
      }
    );
  }

  /** DELETE /api/v1/doctors/{id}/schedules/{scheduleId} */
  deleteSchedule(id: number, scheduleId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.base}/${id}/schedules/${scheduleId}`
    );
  }
}
