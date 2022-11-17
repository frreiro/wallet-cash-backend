import { ITransactionsRepositories } from '../interfaces/Transactions/ITransactionsRepositories.js';
import { prisma } from '../config/database.js';

export class TransactionRepositories implements ITransactionsRepositories{
	async insert(debitedAcountId: number, creditedAcountId: number, value: number) {
		await prisma.transactions.create({
			data: {
				debitedAccountId: debitedAcountId,
				creditedAccountId: creditedAcountId,
				value:value
			}
		});
	}
	
}