import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly STORAGE_KEY = 'transactions';

  constructor(private localStorageService: LocalStorageService) {}

  getTransactions(): Transaction[] {
    return this.localStorageService.getItem<Transaction[]>(this.STORAGE_KEY) || [];
  }

  addTransaction(transaction: Transaction): void {
    const transactions = this.getTransactions();
    transactions.push(transaction);
    this.localStorageService.setItem(this.STORAGE_KEY, transactions);
  }

  getBalance(): number {
    const transactions = this.getTransactions();
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return income - expenses;
  }
}
