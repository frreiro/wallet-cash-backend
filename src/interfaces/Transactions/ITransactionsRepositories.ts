import { Accounts, Transactions } from '@prisma/client';

export interface ITransactionsRepositories{
	insert(debitedAcountId: Accounts['id'],creditedAcountId: Accounts['id'], value: Transactions['value'])
}