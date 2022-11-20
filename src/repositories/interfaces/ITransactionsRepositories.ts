import { Transaction } from '../../entities/Transactions.js';
import { User } from '../../entities/User.js';

export interface ITransactionDBReturn {
	value: number;
	id: number;
	createdAt: Date;
	debitedAccount: { 
		user: {
			id: number;
			accountId:number;
			username: string;
		}
	}
	creditedAccount: { 
		user: {
			id: number;
			accountId:number;
			username: string;
		}
	}
}

export interface ITransactionVisualizer{
	from: User['username']
	to:  User['username']
	value: Transaction['value']
}
export interface ITransactionsRepositories{
	insert(transaction: Omit<Transaction,'id'| 'createdAt'>) : Promise<void>;
	findByUserId(userId: number): Promise<ITransactionDBReturn[]>;
	findByUserIdAndCashOutFilter(userId: number): Promise<ITransactionDBReturn[]>;
	findByUserIdAndCashInFilter(userId: number): Promise<ITransactionDBReturn[]>;

}