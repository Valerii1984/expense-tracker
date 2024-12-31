import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService, Transaction } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html'
})
export class AddTransactionComponent {
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      type: ['income', Validators.required],
      category: [''],
      date: [new Date().toISOString().substring(0, 10), Validators.required]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        ...this.transactionForm.value
      };
      this.transactionService.addTransaction(newTransaction);
      this.transactionForm.reset({
        type: 'income',
        date: new Date().toISOString().substring(0, 10)
      });
    }
  }
}

