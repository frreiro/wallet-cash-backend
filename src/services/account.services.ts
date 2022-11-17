import { IAccountRepositories } from '../interfaces/Account/IAccountRepositories.js';
import { IAccountServices } from '../interfaces/Account/IAccountServices.js';
import { ITransactionsRepositories } from '../interfaces/Transactions/ITransactionsRepositories.js';
import AppError from '../utils/appError.js';

export class AccountServices implements IAccountServices{

	constructor(
		private accountRepositories: IAccountRepositories,
		private transactionsRepositories: ITransactionsRepositories
	){}

	async createAccount(){
		//return this.accountRepositories.create();
		return 200;
	}
	async getAccountBalance(accountId: number): Promise<number> {
		const account = await this.accountRepositories.findAccountById(accountId);
		if(!account) throw new AppError('Account not found', 404);
		return account.balance;
	}

	async transferAmount(leftUserUsername: string, receiveUserUsername: string, amount: number): Promise<void> {
		if(leftUserUsername === receiveUserUsername) throw new AppError('Can not transfer to yourself');

		const leftAccount = await this.accountRepositories.findAccountByUsername(leftUserUsername);
		if(leftAccount.balance < amount) throw new AppError('Account do not have enought balance');
		if(!leftAccount) throw new AppError('Account do not exist');
		
		const receiveAccount = await this.accountRepositories.findAccountByUsername(receiveUserUsername);
		if(!receiveAccount) throw new AppError('Account do not exist');

		await this.accountRepositories.transferAmount(leftAccount.id, receiveAccount.id, amount);
		//await this.transactionsRepositories.insert(leftAccount.id, receiveAccount.id, amount);
	}

}