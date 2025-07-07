import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

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
  payments: any[] = [];
  residents: any[] = [];
  successMessage: string = '';

  newPayment = {
    residentId: '',
    amount: null,
    description: '',
    dueDate: '',
    paymentMethod: '',
    status: 'pending',
    paid: false
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadResidents();
    this.loadPayments();
  }

  getResidentName(residentId: number): string {
    const resident = this.residents.find(r => r.id === residentId);
    return resident ? `${resident.firstName} ${resident.lastName}` : 'Desconocido';
  }

  loadResidents(): void {
    this.http.get<any[]>('http://localhost:3000/residents')
      .subscribe({
        next: data => this.residents = data,
        error: err => console.error('Error al cargar residentes:', err)
      });
  }

  loadPayments(): void {
    this.http.get<any[]>('http://localhost:3000/payments')
      .subscribe({
        next: data => this.payments = data,
        error: err => console.error('Error al cargar pagos:', err)
      });

  }

  createPayment(): void {
    const payment = { ...this.newPayment };

    this.http.post('http://localhost:3000/payments', payment)
      .subscribe({
        next: () => {
          this.successMessage = 'Boleta registrada exitosamente.';
          this.resetForm();

          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: err => {
          console.error('Error al registrar boleta:', err);
        }
      });
  }

  resetForm(): void {
    this.newPayment = {
      residentId: '',
      amount: null,
      description: '',
      dueDate: '',
      paymentMethod: '',
      status: 'pending',
      paid: false
    };
  }
}
