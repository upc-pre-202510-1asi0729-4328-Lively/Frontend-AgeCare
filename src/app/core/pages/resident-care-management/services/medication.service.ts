// src/app/services/medication.service.ts

import { Injectable } from '@angular/core';
import { BaseService} from '../../../../public/shared/services/baseService';
import { Medication} from '../model/medication.entity';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends BaseService<Medication> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.medicationsEndpointPath;
  }
}
