import { Accounts } from '@prisma/client';

export interface IAccountServices{
	createAccount(): Promise<Accounts['id']>;
	getAccountBalance(accountId: Accounts['id']): Promise<Accounts['balance']>;
}