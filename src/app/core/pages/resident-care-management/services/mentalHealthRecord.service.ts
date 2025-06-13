// src/app/services/mental-health-record.service.ts

import { Injectable } from '@angular/core';
import { BaseService} from '../../../../public/shared/services/baseService';
import { MentalHealthRecord} from '../model/mentalHealthRecord.entity';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentalHealthRecordService extends BaseService<MentalHealthRecord> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.mentalHealthRecordsEndpointPath;
  }
}
