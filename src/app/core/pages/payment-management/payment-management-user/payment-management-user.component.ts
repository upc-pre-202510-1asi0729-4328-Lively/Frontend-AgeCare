import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { Payment } from '../model/payment.model';
import { PaymentService } from '../services/payment.service';

import { Resident } from '../../resident-care-management/model/resident.entity';
import { ResidentService } from '../../resident-care-management/services/resident.service';

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

  residentId: number | null = null; // Ya no está hardcodeado
  residents: Resident[] = [];

  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  selectedPayment: Payment | null = null;

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

  constructor(
    private paymentService: PaymentService,
    private residentService: ResidentService
  ) {}

  ngOnInit(): void {
    this.loadResidents();
  }

  loadResidents(): void {
    this.residentService.getAll().subscribe({
      next: (data) => this.residents = data,
      error: (err) => console.error('Error al cargar residentes:', err)
    });
  }

  loadReceipts(): void {
    this.filteredPayments = [];
    this.payments = [];

    if (!this.residentId) {
      console.warn('Ningún residente seleccionado');
      return;
    }

    this.paymentService.getReceiptsByResidentId(this.residentId).subscribe({
      next: (data) => {
        console.log('Boletas recibidas del backend:', data);
        this.payments = data;
        this.filteredPayments = data.filter(p => !p.status); // boletas pendientes
      },
      error: (err) => {
        console.error('Error al cargar boletas:', err);
      }
    });
  }


  expandPayment(payment: Payment): void {
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
      status: true // Usa 'PAID' si el backend espera una cadena exacta, o usa enum si aplicas tipos
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
    this.selectedPayment = null;
    this.cardInfo = { number: '', name: '', expiry: '', ccv: '' };
    this.yapeReceipt = null;
    this.ticketGenerated = false;
  }
}
