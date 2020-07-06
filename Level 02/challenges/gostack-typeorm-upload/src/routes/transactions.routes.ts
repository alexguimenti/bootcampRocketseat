import { Router, json } from 'express';
import { uuid } from 'uuidv4';

import { getCustomRepository, getRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';
import Category from '../models/Category';
import Transaction from '../models/Transaction';

import CreateCategoryService from '../services/CreateCategoryService';

const transactionsRouter = Router();

// const transactions = [];

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepositories = getCustomRepository(TransactionsRepository);
  const balance = await transactionsRepositories.getBalance();
  const transactions = await getRepository(Transaction).find();

  return response.json({ transactions, balance });
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
  const { id } = request.params;
  const deleteTransaction = new DeleteTransactionService();
  await deleteTransaction.execute({ id });
  return response.status(204).json();
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
