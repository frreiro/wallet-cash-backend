import { Accounts, Users } from '@prisma/client';

export interface ITransactionInput{
	amount: number,
	username: Users['username']
}
export interface IAccountServices{
	createAccount(): Promise<Accounts['id']>;
	getAccountBalance(accountId: Accounts['id']): Promise<Accounts['balance']>;
	transferAmount(leftUserUsername:Users['username'], receiveUserUsername:Users['username'], amount: number) : Promise<void>
}