import { Injectable } from '@angular/core';
import { BaseService } from '../../../../public/shared/services/baseService';
import { Medication } from '../model/medication.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { Observable, catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends BaseService<Medication> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.medicationsEndpointPath;
  }

  getAllForResident(residentId: number): Observable<Medication[]> {
    const url = environment.useJsonServer
      ? `${environment.serverBasePath}/medications?residentId=${residentId}`
      : `${environment.serverBasePath}/residents/${residentId}/medications`;

    return this.http.get<Medication[]>(url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
