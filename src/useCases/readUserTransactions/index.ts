import { TransactionRepositories } from '../../repositories/transactions.respositories.js';
import { ReadUserTransactionsController } from './readUserTransaction.controller.js';
import { ReadUserTransactionsUseCase } from './readUserTransactions.useCase.js';

const transactionsRepositories = new TransactionRepositories();
const readUserTransactionsUseCase = new ReadUserTransactionsUseCase(
	transactionsRepositories
);
const readUserTransactionsController = new ReadUserTransactionsController(
	readUserTransactionsUseCase
);

export {
	readUserTransactionsController
};