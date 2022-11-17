import { Transactions } from '@prisma/client';

export class Transaction implements Transactions{
	public readonly id: number;
	public debitedAccountId: number;
	public creditedAccountId: number;
	public value: number;
	public readonly createdAt: Date;

	constructor(transaction: Omit<Transaction,'id'| 'createdAt'>){
		Object.assign(this,transaction);
	}


}