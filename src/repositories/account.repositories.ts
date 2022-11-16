import { IAccountRepositories } from '../interfaces/Account/IAccountRepositories.js';
import { prisma } from '../config/database.js';

export class AccountRepositories implements IAccountRepositories{
	async create(): Promise<number> {
		const account = await prisma.accounts.create({
			data: {
				balance: 10000
			}
		});
		return account.id;
	}
}