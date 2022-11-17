import { AccountRepositories } from '../../repositories/account.repositories.js';
import { UserRespositories } from '../../repositories/users.repositories.js';
import { CreateUserController } from './createUser.controllers.js';
import { CreateUserMiddleware } from './createUser.middleware.js';
import { CreateUserUseCase } from './createUser.useCase.js';
import { createUserSchema } from './schema/createUser.schema.js';

const userRepositories = new UserRespositories();
const accountRepositories = new AccountRepositories();

const createUserUseCase = new CreateUserUseCase(
	userRepositories,
	accountRepositories
);

const createUserMiddleware = new CreateUserMiddleware(
	createUserSchema
);

const createUserController = new CreateUserController(
	createUserUseCase,
);

export {
	createUserController,
	createUserUseCase,
	createUserMiddleware
};