import { IAccountRepositories } from '../interfaces/Account/IAccountRepositories.js';
import { IAccountServices } from '../interfaces/Account/IAccountServices.js';
import { AccountRepositories } from '../repositories/account.repositories.js';
import AppError from '../utils/appError.js';

export class AccountServices implements IAccountServices{

	constructor(
		private accountRepositories: IAccountRepositories
	){}
	async createAccount(){
		return this.accountRepositories.create();
	}
	async getAccountBalance(accountId: number): Promise<number> {
		const account = await this.accountRepositories.findAccountById(accountId);
		if(!account) throw new AppError('Account not found', 404);
		return account.balance;
	}
}