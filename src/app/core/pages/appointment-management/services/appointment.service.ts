import { Injectable } from '@angular/core';
import { BaseService } from '../../../../public/shared/services/baseService';
import { Appointment } from '../model/appointment.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseService<Appointment> {
  constructor(http: HttpClient) {
    super(http);
    
    this.resourceEndpoint = '/appointments';
  }

  getAppointmentsByResidentId(residentId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(
      `${this.resourcePath()}/resident/${residentId}`, 
      this.httpOptions
    ).pipe(this.defaultPipeOperators());
  }

  override update<U = Appointment>(id: number, item: U): Observable<Appointment> {
    return this.http.put<Appointment>(
      `${this.resourcePath()}/${id}`,
      JSON.stringify(item),
      this.httpOptions
    ).pipe(this.defaultPipeOperators());
  }

  override create<U = Appointment>(item: U): Observable<Appointment> {
    return this.http.post<Appointment>(
      this.resourcePath(),
      JSON.stringify(item),
      this.httpOptions
    ).pipe(this.defaultPipeOperators());
  }


}
