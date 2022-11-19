import { IAccountRepositories, IAccountVisualizer } from './interfaces/IAccountRepositories.js';
import { prisma } from '../config/database.js';
import { Accounts } from '@prisma/client';
import { Account } from '../entities/Account.js';

export class AccountRepositories implements IAccountRepositories{

	async create(account: Account): Promise<number> {
		const accountData = await prisma.accounts.create({
			data: account
		});
		return accountData.id;
	}


	async findAccountById(id: number): Promise<IAccountVisualizer> {
		const account = await prisma.accounts.findFirst({
			where: {
				id: id
			},

			select: {
				id: true,
				balance: true,
				user: {
					select: {
						id: true,
						username: true
					}
				}
			}
		});
		return account;
	}

	async findAccountByUsername(username: string): Promise<Accounts> {
		const account = await prisma.accounts.findFirst({
			where: {
				user: {
					username: username
				}
			}
		});
		return account;
	}
	
	async transferAmount(outAccountId: number, inAccountId: number, amount: number): Promise<void> {
		const subtractAmount = prisma.accounts.update({
			where: {
				id: outAccountId,
			},
			data: {
				balance:{
					decrement: amount
				}
			}
		});	

		const addAmount = prisma.accounts.update({
			where: {
				id: inAccountId,
			},

			data: {
				balance: {
					increment: amount
				}
			}
		});

		await prisma.$transaction([subtractAmount, addAmount]);
	}
}