// src/app/core/pages/payment-management/services/payment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment.model';
import { Resident } from '../../resident-care-management/model/resident.entity';
import { environment } from '../../../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private base = `${environment.serverBasePath}/receipts`;

  constructor(private http: HttpClient) {}

  getAllResidents(): Observable<Resident[]> {
    return this.http.get<Resident[]>(`${environment.serverBasePath}/residents`);
  }

  /** GET /api/v1/receipts */
  getAllReceipts(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.base);
  }

  /** GET /api/v1/receipts/{residentId} */
  getReceiptsByResidentId(residentId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.base}/${residentId}`);
  }

  /** GET /api/v1/receipts/searchByReceiptId?receiptId= */
  getReceiptById(receiptId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.base}/searchByReceiptId?receiptId=${receiptId}`);
  }

  /** POST /api/v1/receipts */
  createReceipt(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.base, {
      receiptId: payment.receiptId,
      issueDate: payment.issueDate,
      dueDate: payment.dueDate,
      totalAmount: payment.totalAmount,
      status: payment.status,
      residentId: payment.residentId,
      paymentId: payment.paymentId,
      paymentDate: payment.paymentDate,
      amountPaid: payment.amountPaid,
      paymentMethod: payment.paymentMethod,
      type: payment.type
    });
  }



  /** PUT /api/v1/receipts/{receiptId} */
  updateReceipt(payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.base}/${payment.receiptId}`, {
      receiptId: payment.receiptId,
      issueDate: payment.issueDate,
      dueDate: payment.dueDate,
      totalAmount: payment.totalAmount,
      status: payment.status,
      residentId: payment.residentId,
      paymentId: payment.paymentId,
      paymentDate: payment.paymentDate,
      amountPaid: payment.amountPaid,
      paymentMethod: payment.paymentMethod,
      type: payment.type
    });
  }


  /** DELETE /api/v1/receipts/{receiptId} */
  deleteReceipt(receiptId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${receiptId}`);
  }
}
