import { AccountControllers } from '../controllers/transactions.controllers.js';
import { TokenMiddlware } from '../middlewares/tokenMiddleware.js';
import { UserRespositories } from '../repositories/users.repositories.js';
import { TransactionSchema } from '../schemas/transaction.schema.js';
import { accountServices } from './account.js';

const userRespositories = new UserRespositories();
const tokenMiddleware = new TokenMiddlware(
	userRespositories
);


const transactionSchema = new TransactionSchema();

export {
	tokenMiddleware,
	transactionSchema
};