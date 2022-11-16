import { IAccountRepositories } from '../interfaces/Account/IAccountRepositories.js';
import { prisma } from '../config/database.js';
import { Accounts } from '@prisma/client';

export class AccountRepositories implements IAccountRepositories{
	async create(): Promise<number> {
		const account = await prisma.accounts.create({
			data: {
				balance: 10000
			}
		});
		return account.id;
	}


	async findAccountById(id: number): Promise<Accounts> {
		const account = await prisma.accounts.findFirst({
			where: {
				id: id
			}
		});
		return account;
	}
}