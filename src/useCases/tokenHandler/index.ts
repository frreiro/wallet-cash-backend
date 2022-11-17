import { UserRespositories } from '../../repositories/users.repositories.js';
import { TokenHandlerMiddleware } from './tokenHandler.middleware.js';
import { TokenHandlerUseCase } from './tokenHandler.useCase.js';

const userRespositories = new UserRespositories();
const tokenHandlerUseCase = new TokenHandlerUseCase(
	userRespositories
);
const tokenHandlerMiddleware = new TokenHandlerMiddleware(
	tokenHandlerUseCase
);

export {
	tokenHandlerMiddleware,
	tokenHandlerUseCase
};