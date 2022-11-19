import bcrypt from 'bcrypt';
import AppError from '../../utils/appError.js';
import { User } from '../../entities/User.js';
import { Account } from '../../entities/Account.js';
import { IUserRepositories } from '../../repositories/interfaces/IUserRepositories.js';
import { ICreateUserDTO } from './createUser.DTO.js';
import { IAccountRepositories } from '../../repositories/interfaces/IAccountRepositories.js';

export class CreateUserUseCase{

	constructor(
		private userRepositories: IUserRepositories,
		private accountRepositories: IAccountRepositories  
	){}
	
	async execute(data: ICreateUserDTO){
		const userAlreadyExist = await this.userRepositories.findByUsername(data.username);
		if(userAlreadyExist) throw new AppError('Username already exists', 409);


		const userAccountId = await this.createNewAccountAndReturnId();
		const hashedPassword = bcrypt.hashSync(data.password, 10);

		const user = new User({
			username: data.username,
			password: hashedPassword,
			accountId: userAccountId
		});

		await this.userRepositories.insert(user);
	}

	async createNewAccountAndReturnId(): Promise<Account['id']>{
		const account = new Account({
			balance: 10000
		});
		return await this.accountRepositories.create(account);
	}

}