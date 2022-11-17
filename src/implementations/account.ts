import { AccountControllers } from '../controllers/transactions.controllers.js';
import { AccountRepositories } from '../repositories/account.repositories.js';
import { TransactionRepositories } from '../repositories/transactions.respositories.js';
import { AccountServices } from '../services/account.services.js';

const transactionsRepositories = new TransactionRepositories();
const accountRepositories = new AccountRepositories();
const accountServices = new AccountServices(
	accountRepositories,
	transactionsRepositories
);

const accountControllers = new AccountControllers(
	accountServices
);

export {
	accountServices,
	accountControllers
};