import { Transaction } from '../../entities/Transactions.js';

export interface ITransactionsRepositories{
	insert(transaction: Omit<Transaction,'id'| 'createdAt'>) : Promise<void>;
}