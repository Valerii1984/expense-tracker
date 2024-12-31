import { Injectable } from '@angular/core';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly STORAGE_KEY = 'transactions';

  getTransactions(): Transaction[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addTransaction(transaction: Transaction): void {
    const transactions = this.getTransactions();
    transactions.push(transaction);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactions));
  }

  getBalance(): number {
    const transactions = this.getTransactions();
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return income - expenses;
  }
}
