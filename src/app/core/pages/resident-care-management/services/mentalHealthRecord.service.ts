import { Injectable } from '@angular/core';
import { BaseService} from '../../../../public/shared/services/baseService';
import { MentalHealthRecord } from '../model/mentalHealthRecord.entity';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentalHealthRecordService extends BaseService<MentalHealthRecord> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.mentalHealthRecordsEndpointPath;
  }

  getAllForResident(residentId: number): Observable<MentalHealthRecord[]> {
    const url = environment.useJsonServer
      ? `${environment.serverBasePath}/mental-health-records?residentId=${residentId}`
      : `${environment.serverBasePath}/residents/${residentId}/mental-health-records`;

    return this.http.get<MentalHealthRecord[]>(url, this.httpOptions)
      .pipe(this.defaultPipeOperators());
  }
}
