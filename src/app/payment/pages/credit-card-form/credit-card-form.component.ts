import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReceiptsService } from '../../services/receipts.service'; // Ajusta la ruta según tu estructura
import { Receipt } from '../../model/receipt.entity';

@Component({
  selector: 'app-credit-card-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent {
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  name: string = '';
  amount: number = 0;

  cardHolder: string = '';
  expiration: string = ''; // MM/YY format

  constructor(private receiptsService: ReceiptsService) {}

  submitCardPayment() {
    this.onPay();
  }

  onPay() {
    const newReceipt: Receipt = {
      id: 0, // o undefined, si el backend lo genera
      residentName: this.cardHolder,
      amount: this.amount,
      issueDate: new Date(),
      dueDate: new Date(),
      paymentMethod: 'card',
      status: true,
      cardNumber: this.cardNumber
    };

    this.receiptsService.create(newReceipt).subscribe({
      next: () => {
        alert('Pago registrado con éxito.');
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al registrar el pago', err);
      }
    });
  }

  private resetForm() {
    this.cardNumber = '';
    this.expiryDate = '';
    this.cvv = '';
    this.name = '';
    this.amount = 0;
    this.cardHolder = '';
    this.expiration = '';
  }
}
