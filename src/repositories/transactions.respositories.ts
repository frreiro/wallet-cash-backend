import { ITransactionsRepositories } from '../interfaces/Transactions/ITransactionsRepositories.js';
import { prisma } from '../config/database.js';
import { Transaction } from '../entities/Transactions.js';

export class TransactionRepositories implements ITransactionsRepositories{
	async insert(transaction: Omit<Transaction,'id'| 'createdAt'>) {
		await prisma.transactions.create({
			data: transaction
		});
	}
	
}