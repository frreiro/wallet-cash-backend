import dayjs from 'dayjs';
import { ITransactionDBReturn, ITransactionsRepositories } from '../../repositories/interfaces/ITransactionsRepositories.js';
import { IReadUserTransactionsDTO } from './readUserTransactons.DTO.js';
import timezone from 'dayjs/plugin/timezone.js';
dayjs.extend(timezone);

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
		if(data.filter.date){
			data.filter.date = this.convertDateBrazilToUTC(data.filter.date);
		}

		return this.transactionsRepositories.findByUserIdAndOrFilter(data.user.id,data.filter);
	}


	convertDateBrazilToUTC(date: string){
		const dayBrazil = dayjs(date).format('YYYY-MM-DDTHH:mm:ss-03:00');
		const dayUTC = dayjs.utc(dayBrazil).format('YYYY-MM-DDTHH:mm:ss[Z]');
		return dayUTC;
	}

	manipulateDataFromDb(transactions: ITransactionDBReturn[], accountId: number){
		return transactions.map((transaction) => {
			return {
				id: transaction.id,
				from: transaction.debitedAccount.user,
				to: transaction.creditedAccount.user,
				value: transaction.value,
				type: transaction.debitedAccount.user.accountId === accountId ? 'cash-out' : 'cash-in',
				date: dayjs(transaction.createdAt).tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ssZ')
			};
		});
	}
}