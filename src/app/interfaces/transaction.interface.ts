import { TransactionType } from 'src/app/enums/transaction-type.enum';


export interface Transaction {
  id: number; // Тип id изменен на number
  name: string; // Название транзакции
  amount: number; // Сумма транзакции
  type: TransactionType; // Тип транзакции: доход или расход
  category: string; // Категория транзакции
  date: string; // Дата транзакции в формате ISO (YYYY-MM-DD)
}
