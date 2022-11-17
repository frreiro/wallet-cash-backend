import { Transaction } from '../../entities/Transactions.js';
import { IAccountRepositories } from '../../interfaces/Account/IAccountRepositories.js';
import { ITransactionsRepositories } from '../../interfaces/Transactions/ITransactionsRepositories.js';
import AppError from '../../utils/appError.js';
import { ICreateTransactionDTO } from './createTransaction.DTO.js';


export class CreateTransactionUseCase {

	constructor(
		private accountRepositories: IAccountRepositories,
		private transactionsRepositories: ITransactionsRepositories
	){}

	async execute(data: ICreateTransactionDTO){
		if(data.debitedUsername === data.creditedUsername) throw new AppError('Can not transfer to yourself');

		const debitedAccount = await this.accountRepositories.findAccountByUsername(data.debitedUsername);
		if(debitedAccount.balance < data.value) throw new AppError('Account do not have enought balance');
		if(!debitedAccount) throw new AppError('Account do not exist');
		
		const creditedAccount = await this.accountRepositories.findAccountByUsername(data.creditedUsername);
		if(!creditedAccount) throw new AppError('Account do not exist');

		const transaction = new Transaction({
			debitedAccountId: debitedAccount.id,
			creditedAccountId: creditedAccount.id,
			value: data.value
		});
		await this.accountRepositories.transferAmount(debitedAccount.id, creditedAccount.id, data.value);
		await this.transactionsRepositories.insert(transaction);
	}
}