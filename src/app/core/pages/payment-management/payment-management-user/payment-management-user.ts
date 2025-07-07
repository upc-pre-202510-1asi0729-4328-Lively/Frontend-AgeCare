import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-management-user',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      TranslateModule
    ],
  templateUrl: './payment-management-user.component.html',
  styleUrls: ['./payment-management-user.component.css']
})
export class PaymentManagementUserComponent implements OnInit {

  residentId: number = 2;
  payments: any[] = [];
  filteredPayments: any[] = [];
  selectedPayment: any | null = null;

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.http.get<any[]>('http://localhost:3000/payments')
      .subscribe({
        next: (data) => {
          this.payments = data;
          this.filteredPayments = this.payments.filter(p => p.residentId === this.residentId && !p.paid);
        },
        error: err => console.error('Error al cargar pagos:', err)
      });
  }

  expandPayment(payment: any): void {
    this.selectedPayment = payment;
  }

  pay(payment: any): void {
    this.selectedPayment = payment;
    this.showPaymentForm = true;
    this.selectedMethod = null;
    this.ticketGenerated = false;
  }

  submitCardPayment(): void {
    if (this.cardInfo.number && this.cardInfo.name && this.cardInfo.ccv && this.cardInfo.expiry) {
        this.updatePaymentStatus();
    }
  }

  submitYapePayment(): void {
    if (this.yapeReceipt) {
      this.updatePaymentStatus();
    }
  }

  generateCashTicket(): void {
    this.ticketGenerated = true;
  }

  updatePaymentStatus(): void {
    const updated = {
      ...this.selectedPayment,
      paid: true,
      status: 'paid'
    };

    this.http.put(`http://localhost:3000/payments/${this.selectedPayment.id}`, updated)
      .subscribe({
        next: () => {
          this.showPaymentForm = false;
          this.loadPayments();
        },
        error: err => console.error('Error al actualizar estado del pago:', err)
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
