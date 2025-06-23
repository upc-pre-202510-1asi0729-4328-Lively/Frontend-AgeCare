export class Receipt {
  id?: number;
  residentName: string;
  amount: number;
  paymentMethod: 'card' | 'yape' | 'cash';
  status: boolean | string;
  cardNumber?: string;
  issueDate: Date;  // <--- agregado
  dueDate: Date;    // <--- agregado

  constructor() {
    this.id = 0;
    this.residentName = '';
    this.amount = 0;
    this.paymentMethod = 'cash';
    this.status = false;
    this.cardNumber = '';
    this.issueDate = new Date(); // o null, según tu lógica
    this.dueDate = new Date();
  }
}
