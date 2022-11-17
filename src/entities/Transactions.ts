export class Transaction {
	public readonly id: number;
	public debitedAccountId: number;
	public creditedAccountId: number;
	public value: number;
	public readonly createdAt: Date;

	constructor(transaction: Omit<Transaction,'id'| 'createdAt'>){
		Object.assign(this,transaction);
	}


}