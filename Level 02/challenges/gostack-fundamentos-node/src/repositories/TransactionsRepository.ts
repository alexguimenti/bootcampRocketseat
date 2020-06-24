import { uuid } from 'uuidv4';
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
    this.transactions = [
      {
        id: uuid(),
        title: 'Salário',
        value: 4000,
        type: 'income',
      },
      {
        id: uuid(),
        title: 'Pagamento da fatura',
        value: 4000,
        type: 'outcome',
      },
    ];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const incomeValues = incomeTransactions.map(
      transaction => transaction.value,
    );

    const totalIncome = incomeValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    );

    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcomeValues = outcomeTransactions.map(
      transaction => transaction.value,
    );

    const totalOutcome = outcomeValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
    );

    const total = totalIncome - totalOutcome;

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
