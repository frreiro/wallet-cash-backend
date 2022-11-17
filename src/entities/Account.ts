import { Accounts } from '@prisma/client';

export class Account implements Accounts{
	public readonly id: number;
	public balance: number;
	
	constructor(account: Omit<Account,'id'>){
		Object.assign(this, account);
	}
}