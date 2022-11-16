import { Accounts } from '@prisma/client';

export interface IAccountRepositories{
	create(): Promise<Accounts['id']>;
	findAccountById(id: Accounts['id']): Promise<Accounts>
}