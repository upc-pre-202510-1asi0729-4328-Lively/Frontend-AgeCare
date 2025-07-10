export type PaymentMethod = 'CARD' | 'YAPE' | 'CASH' | 'UNSPECIFIED';
export type PaymentStatus = 'PAID' | 'PENDING' | 'OVERDUE';

export interface Payment {
  id: number;
  residentId: number;
  amount: number;
  description: string;
  dueDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  paid: boolean;
}
