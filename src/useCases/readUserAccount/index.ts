import { AccountRepositories } from '../../repositories/account.repositories.js';
import { ReadUserAccountController } from './readUserAccount.controller.js';
import { ReadUserAccountUseCase } from './readUserAccount.useCase.js';

const accountRespositories = new AccountRepositories();
const readUserAccountUseCase = new ReadUserAccountUseCase(
	accountRespositories
);

const readUserAccountController = new ReadUserAccountController(
	readUserAccountUseCase
);

export {
	readUserAccountController
};