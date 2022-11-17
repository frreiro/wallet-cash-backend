import { Accounts, Users } from '@prisma/client';
import { Account } from '../../entities/Account.js';

export interface IAccountRepositories{
	create(account: Account): Promise<Accounts['id']>;
	findAccountById(id: Accounts['id']): Promise<Accounts>
	findAccountByUsername(username: Users['username']): Promise<Accounts>
	transferAmount(outAccountId:Accounts['id'], inAccountId:Accounts['id'], amount: number ): Promise<void>
}