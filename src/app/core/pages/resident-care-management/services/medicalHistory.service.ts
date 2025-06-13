// src/app/services/medical-history.service.ts

import { Injectable } from '@angular/core';
import { BaseService} from '../../../../public/shared/services/baseService';
import { MedicalHistory} from '../model/medicalHistory.entity';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService extends BaseService<MedicalHistory> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.medicalHistoryEndpointPath;
  }
}
