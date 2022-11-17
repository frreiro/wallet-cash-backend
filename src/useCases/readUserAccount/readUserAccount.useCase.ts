import { IAccountRepositories } from '../../repositories/interfaces/IAccountRepositories.js';
import { IReadUserAccountDTO } from './readUserAccount.DTO.js';

export class ReadUserAccountUseCase{

	constructor(
		private accountRespositories: IAccountRepositories,
	){}

	async execute(data: IReadUserAccountDTO){
		const userAccount = this.accountRespositories.findAccountById(data.accountId);
		return userAccount;
	}
}