import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
  }
}
