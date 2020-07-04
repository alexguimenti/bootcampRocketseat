import { Router } from 'express';
import { uuid } from 'uuidv4';

import { getCustomRepository, getRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';
import Category from '../models/Category';

import CreateCategoryService from '../services/CreateCategoryService';

const transactionsRouter = Router();

// const transactions = [];

transactionsRouter.get('/', async (request, response) => {
  return response.json({ message: 'transactions' });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
