import { AccountControllers } from '../controllers/transactions.controllers.js';
import { TokenMiddlware } from '../middlewares/tokenMiddleware.js';
import { AccountRepositories } from '../repositories/account.repositories.js';
import { UserRespositories } from '../repositories/users.repositories.js';
import { AccountServices } from '../services/account.services.js';

const userRespositories = new UserRespositories();
const tokenMiddleware = new TokenMiddlware(
	userRespositories
);

const accountRepositories = new AccountRepositories();
const accountServices = new AccountServices(
	accountRepositories
);
const accountControllers = new AccountControllers(
	accountServices
);

export {
	tokenMiddleware,
	accountControllers
};