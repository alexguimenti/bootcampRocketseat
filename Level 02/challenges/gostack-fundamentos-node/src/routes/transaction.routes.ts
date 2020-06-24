import { Router } from 'express';
import { uuid } from 'uuidv4';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

// const transactionsRepository = new TransactionsRepository();

interface Transaction {
  id: string,
  title: string;
  value: number;
  type: string;
}

const transactions: Transaction[] = [
  {
    id: uuid(),
    title: "Salário",
    value: 4000,
    type: "income"
  },
  {
    id: uuid(),
    title: "Freela",
    value: 2000,
    type: "income"
  },
  {
    id: uuid(),
    title: "Pagamento da fatura",
    value: 4000,
    type: "outcome"
  },
  {
    id: uuid(),
    title: "Cadeira Gamer",
    value: 1200,
    type: "outcome"
  }
];

transactionRouter.get('/', (request, response) => {
  try {
    const incomeTransactions = transactions.filter(
      transaction => transaction.type == 'income'
    )

    const incomeValues = incomeTransactions.map(
      transaction => transaction.value
    )

    const totalIncome = incomeValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )

    const outcomeTransactions = transactions.filter(
      transaction => transaction.type == 'outcome'
    )

    const outcomeValues = outcomeTransactions.map(
      transaction => transaction.value
    )

    const totalOutcome = outcomeValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    )

    const total = totalIncome - totalOutcome;

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total
    }

    console.log(incomeValues, totalIncome);
    console.log(outcomeValues, totalOutcome);

    const output = {
      transactionsTotal: transactions,
      balance
    }
    return response.json(output)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transaction = {
      id: uuid(),
      title,
      value,
      type
    }
    transactions.push(transaction);

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
