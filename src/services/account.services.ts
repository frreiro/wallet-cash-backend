import { IAccountRepositories } from '../interfaces/Account/IAccountRepositories.js';
import { IAccountServices } from '../interfaces/Account/IAccountServices.js';
import { AccountRepositories } from '../repositories/account.repositories.js';

export class AccountServices implements IAccountServices{

	constructor(
		private accountRepositories: IAccountRepositories
	){}
	async createAccount(){
		return this.accountRepositories.create();
	}
}