import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => {
        return transaction.type === 'income';
      })
      .reduce((total, inicial) => {
        return total + inicial.value;
      }, 0);

    const outcome = this.transactions
      .filter(transaction => {
        return transaction.type === 'outcome';
      })
      .reduce((total, inicial) => {
        return total + inicial.value;
      }, 0);

    const total = income - outcome;

    return { outcome, income, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
