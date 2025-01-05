import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { TransactionType } from 'src/app/enums/transaction-type.enum'; // Импорт enum

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
})
export class AddTransactionComponent {
  transactionForm: FormGroup; // Определяем тип
  transactionTypes = Object.values(TransactionType); // Генерируем массив значений из enum

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      type: [TransactionType.Income, Validators.required],
      category: [''],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const newTransaction: Transaction = {
        id: Date.now(), // Используем уникальный числовой id
        ...this.transactionForm.value,
      };
      this.transactionService.addTransaction(newTransaction);
      this.transactionForm.reset({
        type: TransactionType.Income, // Сбрасываем на "income"
        date: new Date().toISOString().substring(0, 10),
      });
    }
  }
}

