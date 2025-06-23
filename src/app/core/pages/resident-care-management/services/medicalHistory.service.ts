import { Injectable } from '@angular/core';
import { BaseService} from '../../../../public/shared/services/baseService';
import { MedicalHistory } from '../model/medicalHistory.entity';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService extends BaseService<MedicalHistory> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.medicalHistoryEndpointPath;
  }

  getAllForResident(residentId: number): Observable<MedicalHistory[]> {
    const url = environment.useJsonServer
      ? `${environment.serverBasePath}/medical-histories?residentId=${residentId}`
      : `${environment.serverBasePath}/residents/${residentId}/medical-histories`;

    return this.http.get<MedicalHistory[]>(url, this.httpOptions)
      .pipe(this.defaultPipeOperators());
  }
}
