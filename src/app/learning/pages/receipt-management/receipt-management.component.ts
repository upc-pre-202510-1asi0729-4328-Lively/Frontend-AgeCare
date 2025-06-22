import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { ReceiptsService } from '../../services/receipts.service';
import { Receipt } from '../../model/receipt.entity';
import { ReceiptCreateAndEditComponent } from '../../components/receipt-create-and-edit/receipt-create-and-edit.component';

import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-receipt-management',
  imports: [CommonModule,MatPaginator, MatSort, MatIconModule, ReceiptCreateAndEditComponent,
            MatTableModule, NgClass, TranslateModule,MatFormFieldModule,
                                                       MatInputModule,
                                                       MatSelectModule,],
  templateUrl: './receipt-management.component.html',
  styleUrl: './receipt-management.component.css'
})
export class ReceiptManagementComponent implements OnInit, AfterViewInit {
  // Attributes
  receiptData: Receipt;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'residentName', 'amount', 'paymentMethod', 'status', 'issueDate', 'dueDate', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // Constructor
  constructor(private receiptService: ReceiptsService) {
    this.isEditMode = false;
    this.receiptData = {} as Receipt;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.receiptData = {
      id: 0, // Se sobreescribe luego
      residentName: '',
      amount: 0,
      issueDate: new Date(),
      dueDate: new Date(),
      paymentMethod: 'cash',
      status: true,
      cardNumber: ''
    };
  }


  // CRUD Actions

  private getAllReceipts(): void {
    this.receiptService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createReceipt(): void {
    this.receiptService.create(this.receiptData)
      .subscribe((response: Receipt) => {
        this.dataSource.data = [...this.dataSource.data, response];
      });
  }

  private updateReceipt(): void {
    let receiptToUpdate: Receipt = this.receiptData;
    this.receiptService.update(this.receiptData.id, receiptToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((receipt: Receipt) => {
            if (receipt.id === response.id) {
              return response;
            }
            return receipt;
          });
      });
  };

  private deleteReceipt(receiptId: number): void {
    this.receiptService.delete(receiptId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((receipt: Receipt) => receipt.id !== receiptId);
      });
  };

  // UI Event Handlers

  onEditItem(element: Receipt) {
    this.isEditMode = true;
    this.receiptData = element;
  }

  onDeleteItem(element: Receipt) {
    this.deleteReceipt(element.id!);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllReceipts();
  }

  onReceiptAdded(element: Receipt) {
    this.receiptData = element;
    this.createReceipt(); // Esto debería agregar el recibo a la tabla
    this.resetEditState();
  }


  onReceiptUpdated(element: Receipt) {
    this.receiptData = element;
    this.updateReceipt();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllReceipts();
  }

}
