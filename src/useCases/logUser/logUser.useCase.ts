import bcrypt from 'bcrypt';
import AppError from '../../utils/appError.js';
import { ILogUserDTO } from './logUser.DTO.js';
import { IUserRepositories } from '../../repositories/interfaces/IUserRepositories.js';
import { TokenHandlerUseCase } from '../tokenHandler/tokenHandler.useCase.js';

export class LogUserUseCase {

	constructor(
		private userRepository:IUserRepositories,
		private tokenHandlerUseCase: TokenHandlerUseCase
	){}

	async execute(data:ILogUserDTO ){
		const user = await this.userRepository.findByUsername(data.username);
		if(!user) throw new AppError('User do not exist', 404);

		const correctPass = bcrypt.compareSync(data.password, user.password); 
		if(!correctPass) throw new AppError('Username or password are incorrect', 404);

		const token = this.tokenHandlerUseCase.createToken({id: user.id, accountId: user.accountId});
		return token;
	}
}