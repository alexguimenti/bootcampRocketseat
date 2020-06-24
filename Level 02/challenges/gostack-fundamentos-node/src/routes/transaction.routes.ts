import { Router } from 'express';
import { uuid } from 'uuidv4';

import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

// interface Transaction {
//   id: string;
//   title: string;
//   value: number;
//   type: string;
// }

transactionRouter.get('/', (request, response) => {
  try {

    const transactions = transactionsRepository.all();

    const balance = transactionsRepository.getBalance();


    const output = {
      transactions,
      balance,
    };

    return response.json(output)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transaction = transactionsRepository.create({ title, value, type });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
