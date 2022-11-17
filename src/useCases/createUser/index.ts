import { AccountRepositories } from '../../repositories/account.repositories.js';
import { UserRespositories } from '../../repositories/users.repositories.js';
import { CreateUserController } from './createUser.controllers.js';
import { CreateUserMiddleware } from './createUser.middleware.js';
import { UserSchemas } from './createUser.schema.js';
import { CreateUserUseCase } from './createUser.useCase.js';

const userRepositories = new UserRespositories();
const accountRepositories = new AccountRepositories();

const createUserUseCase = new CreateUserUseCase(
	userRepositories,
	accountRepositories
);

const userSchemas = new UserSchemas();
const createUserMiddleware = new CreateUserMiddleware(
	userSchemas
);

const createUserController = new CreateUserController(
	createUserUseCase,
);

export {
	createUserController,
	createUserUseCase,
	createUserMiddleware
};