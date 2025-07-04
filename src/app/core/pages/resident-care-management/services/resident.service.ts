import { Injectable } from '@angular/core';
import { BaseService } from '../../../../public/shared/services/baseService';
import { Resident } from '../model/resident.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import {ResidentDetails} from '../model/residentDetails.entity';

@Injectable({
  providedIn: 'root'
})
export class ResidentService extends BaseService<Resident> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.residentsEndpointPath;
  }

    getResidentDetails(id: number): Observable<ResidentDetails> {
      return this.http.get<ResidentDetails>(`${this.resourcePath()}/${id}/details`, this.httpOptions)
       .pipe(this.defaultPipeOperators());
    }

}
