import { Accounts } from '@prisma/client';

export interface IAccountRepositories{
	create(): Promise<Accounts['id']>;
}