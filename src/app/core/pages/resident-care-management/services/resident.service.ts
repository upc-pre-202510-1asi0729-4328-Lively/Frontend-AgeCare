// src/app/services/resident.service.ts

import { Injectable } from '@angular/core';
import { BaseService} from '../../../../public/shared/services/baseService';
import { Resident} from '../model/resident.entity';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResidentService extends BaseService<Resident> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.residentsEndpointPath;
  }
}
