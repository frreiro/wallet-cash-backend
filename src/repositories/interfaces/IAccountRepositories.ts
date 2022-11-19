import { Accounts, Users } from '@prisma/client';
import { Account } from '../../entities/Account.js';

export interface IAccountVisualizer {
	id: number;
	balance: number;
	user: {
		id: number;
		username: string;
	}
}
export interface IAccountRepositories{
	create(account: Account): Promise<Accounts['id']>;
	findAccountById(id: Accounts['id']): Promise<IAccountVisualizer>
	findAccountByUsername(username: Users['username']): Promise<Accounts>
	transferAmount(outAccountId:Accounts['id'], inAccountId:Accounts['id'], amount: number ): Promise<void>
}