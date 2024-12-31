import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-balance',
  template: `<h2>Your Balance: {{ balance | currency }}</h2>`
})
export class BalanceComponent implements OnInit {
  balance: number = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.balance = this.transactionService.getBalance();
  }
}

