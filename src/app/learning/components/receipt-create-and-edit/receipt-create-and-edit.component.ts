import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Receipt } from '../../model/receipt.entity';

@Component({
  selector: 'app-receipt-create-and-edit',
  standalone: true,
  templateUrl: './receipt-create-and-edit.component.html',
  styleUrls: ['./receipt-create-and-edit.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class ReceiptCreateAndEditComponent {
  // Inputs y Outputs
  @Input() receipt!: Receipt;
  @Input() editMode: boolean = false;

  @Output() receiptAdded: EventEmitter<Receipt> = new EventEmitter<Receipt>();
  @Output() receiptUpdated: EventEmitter<Receipt> = new EventEmitter<Receipt>();
  @Output() editCanceled: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('receiptForm', { static: false }) receiptForm!: NgForm;

  // Reset del formulario
  private resetForm(): void {
    this.receipt = {
      id: 0,
      residentName: '',
      amount: 0,
      issueDate: new Date(),
      dueDate: new Date(),
      paymentMethod:'card',
      status: false,
      cardNumber: ''
    };
    this.editMode = false;
    this.receiptForm.resetForm();
  }

  // Envío del formulario
  onSubmit(): void {
    if (this.receiptForm.form.valid) {
      const emitter = this.editMode ? this.receiptUpdated : this.receiptAdded;
      emitter.emit(this.receipt);
      this.resetForm();
    } else {
      console.error('Formulario inválido');
    }
  }

  // Cancelación
  onCancel(): void {
    this.editCanceled.emit();
    this.resetForm();
  }
}
