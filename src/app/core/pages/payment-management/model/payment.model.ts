export interface Payment {
  receiptId: number;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  status: boolean;
  residentId: number | null;
  paymentId: number | null;
  paymentDate: string;
  amountPaid: number;
  paymentMethod: number; // 0: Tarjeta, 1: Yape, 2: Efectivo
  type: string;
}
