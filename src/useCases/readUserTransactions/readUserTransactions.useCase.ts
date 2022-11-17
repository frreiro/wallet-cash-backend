import { ITransactionDBReturn, ITransactionsRepositories } from '../../interfaces/Transactions/ITransactionsRepositories.js';
import AppError from '../../utils/appError.js';
import { IReadUserTransactionsDTO } from './readUserTransactons.DTO.js';

export class ReadUserTransactionsUseCase{

	constructor(
		private transactionsRepositories: ITransactionsRepositories,
	){}

	async execute(data: IReadUserTransactionsDTO){
		const transactions = await this.findCorrectTransactionListByFilter(data);
		const filteredTransactions = this.manipulateDataFromDb(transactions);
		return filteredTransactions;

	}

	async findCorrectTransactionListByFilter(data: IReadUserTransactionsDTO){
		if(data.filter.method === 'cashin'){
			return this.transactionsRepositories.findByUserIdAndCashInFilter(data.user.id);
		}
		else if(data.filter.method === 'cashout'){
			return this.transactionsRepositories.findByUserIdAndCashOutFilter(data.user.id);
				
		}
		else{
			return this.transactionsRepositories.findByUserId(data.user.id);
		}
	}

	manipulateDataFromDb(transactions: ITransactionDBReturn[]){
		return transactions.map((transaction) => {
			return {
				id: transaction.id,
				from: transaction.debitedAccount.user,
				to: transaction.creditedAccount.user,
				value: transaction.value,
			};
		});
	}
}