import { UserRespositories } from '../../repositories/users.repositories.js';
import { tokenHandlerUseCase } from '../tokenHandler/index.js';
import { LogUserController } from './logUser.controller.js';
import { LogUserMiddleware } from './logUser.middleware.js';
import { LogUserUseCase } from './logUser.useCase.js';
import { logUserSchema } from './schema/logUser.schema.js';

const logUserMiddleware = new LogUserMiddleware(
	logUserSchema
);

const userRepositories = new UserRespositories();
const logUserUseCase = new LogUserUseCase(
	userRepositories,
	tokenHandlerUseCase
);
const logUserController = new LogUserController(
	logUserUseCase
);

export {
	logUserMiddleware,
	logUserController
};