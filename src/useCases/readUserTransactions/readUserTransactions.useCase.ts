import { ITransactionDBReturn, ITransactionsRepositories } from '../../repositories/interfaces/ITransactionsRepositories.js';
import { IReadUserTransactionsDTO } from './readUserTransactons.DTO.js';

export class ReadUserTransactionsUseCase{

	constructor(
		private transactionsRepositories: ITransactionsRepositories,
	){}

	async execute(data: IReadUserTransactionsDTO){
		const transactions = await this.findCorrectTransactionListByFilter(data);
		const filteredTransactions = this.manipulateDataFromDb(transactions, data.user.accountId);
		return filteredTransactions;

	}

	async findCorrectTransactionListByFilter(data: IReadUserTransactionsDTO){
		return this.transactionsRepositories.findByUserIdAndOrFilter(data.user.id,data.filter);
	}

	manipulateDataFromDb(transactions: ITransactionDBReturn[], accountId: number){
		return transactions.map((transaction) => {
			return {
				id: transaction.id,
				from: transaction.debitedAccount.user,
				to: transaction.creditedAccount.user,
				value: transaction.value,
				type: transaction.debitedAccount.user.accountId === accountId ? 'cash-out' : 'cash-in',
				date: transaction.createdAt
			};
		});
	}
}