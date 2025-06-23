import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Receipt } from "../model/receipt.entity";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService extends BaseService<Receipt> {

  constructor(http: HttpClient) {
      super(http);
      this.resourceEndpoint = '/receipts';
    }
}
