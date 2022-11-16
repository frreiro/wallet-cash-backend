import { IAccountRepositories } from '../interfaces/Account/IAccountRepositories.js';
import { IAccountServices } from '../interfaces/Account/IAccountServices.js';
import { AccountRepositories } from '../repositories/account.repositories.js';

export class AccountServices implements IAccountServices{
	public accountRepositories: IAccountRepositories = new AccountRepositories();

	async createAccount(){
		return this.accountRepositories.create();
	}
}