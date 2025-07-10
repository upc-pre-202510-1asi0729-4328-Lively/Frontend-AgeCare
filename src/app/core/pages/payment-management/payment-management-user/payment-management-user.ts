import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Payment } from '../model/payment.model';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment-management-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './payment-management-user.component.html',
  styleUrls: ['./payment-management-user.component.css']
})
export class PaymentManagementUserComponent implements OnInit {

  residentId: number = 2;
  receipts: Payment[] = [];
  filteredReceipts: Payment[] = [];
  selectedReceipt: Payment | null = null;

  showPaymentForm: boolean = false;
  selectedMethod: 'card' | 'yape' | 'cash' | null = null;

  cardInfo = {
    number: '',
    name: '',
    expiry: '',
    ccv: ''
  };

  yapeReceipt: File | null = null;
  ticketGenerated: boolean = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadReceipts();
  }

  loadReceipts(): void {
    this.paymentService.getByResidentId(this.residentId)
      .subscribe({
        next: data => {
          this.payments = data;
          this.filteredPayments = data.filter(r => !r.paid);
        },
        error: err => console.error('Error al cargar boletas:', err)
      });
  }

  expandReceipt(payment: Payment): void {
    this.selectedPayment = payment;
  }

  pay(payment: Payment): void {
    this.selectedPayment = payment;
    this.showPaymentForm = true;
    this.selectedMethod = null;
    this.ticketGenerated = false;
  }

  submitCardPayment(): void {
    if (this.cardInfo.number && this.cardInfo.name && this.cardInfo.ccv && this.cardInfo.expiry) {
      this.updateReceiptStatus();
    }
  }

  submitYapePayment(): void {
    if (this.yapeReceipt) {
      this.updateReceiptStatus();
    }
  }

  generateCashTicket(): void {
    this.ticketGenerated = true;
  }

  updateReceiptStatus(): void {
    if (!this.selectedPayment) return;

    const updatedReceipt: Payment = {
      ...this.selectedPayment,
      paid: true,
      status: 'PAID' // Usa 'PAID' si el backend espera una cadena exacta, o usa enum si aplicas tipos
    };

    this.paymentService.updateReceipt(updatedReceipt)
      .subscribe({
        next: () => {
          this.showPaymentForm = false;
          this.loadReceipts();
        },
        error: err => console.error('Error al actualizar boleta:', err)
      });
  }

  handleYapeFileUpload(event: any): void {
    this.yapeReceipt = event.target.files[0];
  }

  cancelPayment(): void {
    this.showPaymentForm = false;
    this.selectedMethod = null;
    this.selectedReceipt = null;
    this.cardInfo = { number: '', name: '', expiry: '', ccv: '' };
    this.yapeReceipt = null;
    this.ticketGenerated = false;
  }
}
