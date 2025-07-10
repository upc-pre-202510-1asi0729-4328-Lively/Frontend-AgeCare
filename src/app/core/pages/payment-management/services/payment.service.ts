// src/app/core/pages/payment-management/services/receipt.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receipt } from '../model/receipt.model';
import { environment } from '../../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ReceiptService {
  private base = `${environment.serverBasePath}/receipts`;

  constructor(private http: HttpClient) {}

  /** GET /api/v1/receipts */
  getAllReceipts(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(this.base);
  }

  /** GET /api/v1/receipts/{residentId} */
  getReceiptsByResidentId(residentId: number): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(`${this.base}/${residentId}`);
  }

  /** GET /api/v1/receipts/searchByReceiptId?receiptId= */
  getReceiptById(receiptId: number): Observable<Receipt> {
    return this.http.get<Receipt>(`${this.base}/searchByReceiptId?receiptId=${receiptId}`);
  }

  /** POST /api/v1/receipts */
  createReceipt(receipt: Receipt): Observable<Receipt> {
    return this.http.post<Receipt>(this.base, {
      residentId: receipt.residentId,
      amount:     receipt.amount,
      description: receipt.description,
      dueDate:    receipt.dueDate,
      paymentMethod: receipt.paymentMethod,
      status:     receipt.status,
      paid:       receipt.paid
    });
  }

  /** PUT /api/v1/receipts/{receiptId} */
  updateReceipt(receipt: Receipt): Observable<Receipt> {
    return this.http.put<Receipt>(`${this.base}/${receipt.id}`, {
      residentId: receipt.residentId,
      amount:     receipt.amount,
      description: receipt.description,
      dueDate:    receipt.dueDate,
      paymentMethod: receipt.paymentMethod,
      status:     receipt.status,
      paid:       receipt.paid
    });
  }

  /** DELETE /api/v1/receipts/{receiptId} */
  deleteReceipt(receiptId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${receiptId}`);
  }
}
