import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardFormComponent } from '../../../pages/home/credit-card-form/credit-card-form.component';
import { ReceiptsService } from '../../../learning/services/receipts.service';
import { Receipt } from '../../../learning/model/receipt.entity';


@Component({
  selector: 'app-home',
  imports: [
      CommonModule,
      CreditCardFormComponent // <--- IMPORTANTE
    ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedMethod: 'card' | 'yape' | null = null;

  constructor(private receiptService: ReceiptsService) {}

  onCardPaymentSuccess(receipt: Receipt) {
    this.receiptService.create(receipt).subscribe(() => {
      alert('¡Pago con tarjeta registrado con éxito!');
    });
  }
}
