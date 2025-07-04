import { Injectable } from '@angular/core';
import { BaseService } from '../../../../public/shared/services/baseService';
import { Resident } from '../model/resident.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentService extends BaseService<Resident> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.residentsEndpointPath;
  }

  // 🔽 Nuevo método para obtener detalles completos
  getResidentDetails(id: number): Observable<Resident> {
    const url = `${this.basePath}${this.resourceEndpoint}/${id}/details`;
    return this.http.get<Resident>(url, this.httpOptions)
      .pipe(this.defaultPipeOperators());
  }
}
