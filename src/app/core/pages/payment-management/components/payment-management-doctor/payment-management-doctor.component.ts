import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { Payment } from '../../model/payment.model';
import { PaymentService } from '../../services/payment.service';
import { Resident } from '../../../resident-care-management/model/resident.entity';
import { ResidentService } from '../../../resident-care-management/services/resident.service';

@Component({
  selector: 'app-payment-management-doctor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule
  ],
  templateUrl: './payment-management-doctor.component.html',
  styleUrls: ['./payment-management-doctor.component.css']
})
export class PaymentManagementDoctorComponent implements OnInit {
  payments: Payment[] = [];
  residents: Resident[] = [];
  successMessage: string = '';

  newPayment: Payment = {
    receiptId: 0,
    issueDate: '',
    dueDate: '',
    totalAmount: 0,
    status: false,
    residentId: null, // ahora es number | null
    paymentId: null,
    paymentDate: '',
    amountPaid: 0,
    paymentMethod: 0,
    type: ''
  };

  constructor(
    private paymentService: PaymentService,
    private residentService: ResidentService
  ) {}

  ngOnInit(): void {
    this.loadResidents();
    this.loadPayments();
  }

  loadResidents(): void {
    this.residentService.getAll().subscribe({
      next: (data) => (this.residents = data),
      error: (err) => console.error('Error al cargar residentes:', err)
    });
  }

  loadPayments(): void {
    this.paymentService.getAllReceipts().subscribe({
      next: (data) => (this.payments = data),
      error: (err) => console.error('Error al cargar boletas:', err)
    });
  }

  createPayment(): void {
    if (this.newPayment.residentId === null || this.newPayment.residentId <= 0) {
      console.error("El residentId no es válido:", this.newPayment.residentId);
      return;
    }

    const now = new Date().toISOString();

    const payment: Payment = {
      ...this.newPayment,
      issueDate: now,
      paymentDate: now,
      status: this.newPayment.amountPaid >= this.newPayment.totalAmount,
      paymentId: 0, // el backend puede sobrescribirlo
      residentId: this.newPayment.residentId
    };

    console.log('Data que se enviará al backend:', JSON.stringify(payment, null, 2));
    console.log('Tipo de residentId:', typeof payment.residentId); // debería imprimir 'number'

    this.paymentService.createReceipt(payment).subscribe({
      next: () => {
        this.successMessage = 'Boleta registrada exitosamente.';
        this.resetForm();
        this.loadPayments();
        setTimeout(() => (this.successMessage = ''), 3000);
      },
      error: err => {
        console.error('Error al registrar boleta:', err);
      }
    });
  }

  resetForm(): void {
    this.newPayment = {
      receiptId: 0,
      issueDate: '',
      dueDate: '',
      totalAmount: 0,
      status: false,
      residentId: null,
      paymentId: 0,
      paymentDate: '',
      amountPaid: 0,
      paymentMethod: 0,
      type: ''
    };
  }

  getResidentName(residentId: number | null): string {
    const resident = this.residents.find(r => r.id === residentId);
    return resident ? `${resident.firstName} ${resident.lastName}` : 'Desconocido';
  }

  getPaymentMethodName(method: number): string {
    switch (method) {
      case 0:
        return 'Tarjeta';
      case 1:
        return 'Yape';
      case 2:
        return 'Efectivo';
      default:
        return 'Desconocido';
    }
  }

  getPaymentMethodString(method: number): string {
    switch (method) {
      case 0: return 'CARD';
      case 1: return 'YAPE';
      case 2: return 'CASH';
      default: return 'UNSPECIFIED';
    }
  }

  formatDateForBackend(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0]; // formato "YYYY-MM-DD"
  }
}
