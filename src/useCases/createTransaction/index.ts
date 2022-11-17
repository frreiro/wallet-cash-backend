import { AccountRepositories } from '../../repositories/account.repositories.js';
import { TransactionRepositories } from '../../repositories/transactions.respositories.js';
import { CreateTransactionController } from './createTransaction.controller.js';
import { CreateTransactionMiddleware } from './createTransaction.middleware.js';
import { CreateTransactionUseCase } from './createTransaction.useCase.js';
import { createTransactionSchema } from './schema/createTransacation.schema.js';

const createTransactionMiddleware = new CreateTransactionMiddleware(
	createTransactionSchema
);

const accountRepositories = new AccountRepositories();
const transactionsRepositories = new TransactionRepositories();
const createTransactionUseCase = new CreateTransactionUseCase(
	accountRepositories,
	transactionsRepositories

);
const createTransactionController = new CreateTransactionController(
	createTransactionUseCase
);

export {
	createTransactionMiddleware,
	createTransactionController
};