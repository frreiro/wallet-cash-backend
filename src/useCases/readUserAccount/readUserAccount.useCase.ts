import { IAccountRepositories } from '../../repositories/interfaces/IAccountRepositories.js';
import { IReadUserAccountDTO } from './readUserAccount.DTO.js';

export class ReadUserAccountUseCase{

	constructor(
		private accountRespositories: IAccountRepositories,
	){}

	async execute(data: IReadUserAccountDTO){
		const userAccount = await this.accountRespositories.findAccountById(data.accountId);
		const userAccountData = {
			userId: userAccount.user.id,
			username: userAccount.user.username,
			accountId: userAccount.id,
			balance: userAccount.balance
		};
		return userAccountData;
	}
}