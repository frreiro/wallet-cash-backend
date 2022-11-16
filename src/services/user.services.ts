import { IAccountServices } from '../interfaces/Account/IAccountServices.js';
import { IUserRepositories } from '../interfaces/User/IUserRepositories.js';
import { IUserInput, IUserServices } from '../interfaces/User/IUserServices.js';
import bcrypt from 'bcrypt';
import { AccountServices } from './account.services.js';
import { UserRespositories } from '../repositories/users.repositories.js';
import AppError from '../utils/appError.js';
import { ITokenHandler } from '../interfaces/Utils/ITokenHandler.js';
import { TokenHandler } from '../utils/token.js';

export class UserServices implements IUserServices {
	public userRepository: IUserRepositories = new UserRespositories();
	public accountServices: IAccountServices = new AccountServices();
	public tokenHandler: ITokenHandler = new TokenHandler();

	async createUser(userInfo: IUserInput): Promise<void> {
		const user = await this.userRepository.findByUsername(userInfo.username);
		if(user) throw new AppError('Username already exists', 402);

		const userAccountId = await this.accountServices.createAccount();
		const hashedPassword = bcrypt.hashSync(userInfo.password, 10);

		const userInfoUpdatedToDb = {
			username: userInfo.username,
			password: hashedPassword,
			accountId: userAccountId
		};

		await this.userRepository.insert(userInfoUpdatedToDb);
	}

	async logUser(userInfo: IUserInput): Promise<string> {
		const user = await this.userRepository.findByUsername(userInfo.username);
		if(!user) throw new AppError('User do not exist', 404);

		const correctPass = bcrypt.compareSync(userInfo.password, user.password); 
		if(!correctPass) throw new AppError('Username or password are incorrect', 404);

		const token = this.tokenHandler.createToken(user.id);
		return token;
	}
}