import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { Payment } from '../../model/payment.model';
import { PaymentService } from '../../services/payment.service';

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
  residents: any[] = [];
  successMessage: string = '';

  newPayment: Payment = {
    id: 0,
    residentId: 0,
    amount: 0,
    description: '',
    dueDate: '',
    paymentMethod: 'UNSPECIFIED',
    status: 'PENDING',
    paid: false
  };

  constructor(
    private http: HttpClient,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.loadResidents();
    this.loadPayments();
  }

  getResidentName(residentId: number): string {
    const resident = this.residents.find(r => r.id === residentId);
    return resident ? `${resident.firstName} ${resident.lastName}` : 'Desconocido';
  }

  loadResidents(): void {
    this.http.get<any[]>('http://localhost:3000/residents').subscribe({
      next: data => this.residents = data,
      error: err => console.error('Error al cargar residentes:', err)
    });
  }

  loadPayments(): void {
    this.paymentService.getAllReceipts().subscribe({
      next: data => this.payments = data,
      error: err => console.error('Error al cargar pagos:', err)
    });
  }

  createPayment(): void {
    const paymentToCreate: Payment = { ...this.newPayment };

    this.paymentService.createReceipt(paymentToCreate).subscribe({
      next: () => {
        this.successMessage = 'Boleta registrada exitosamente.';
        this.resetForm();
        this.loadPayments();

        setTimeout(() => this.successMessage = '', 3000);
      },
      error: err => {
        console.error('Error al registrar boleta:', err);
      }
    });
  }

  resetForm(): void {
    this.newPayment = {
      id: 0,
      residentId: 0,
      amount: 0,
      description: '',
      dueDate: '',
      paymentMethod: 'UNSPECIFIED',
      status: 'PENDING',
      paid: false
    };
  }
}
