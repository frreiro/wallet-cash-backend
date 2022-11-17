import { Request, Response } from 'express';
import { ReadUserAccountUseCase } from './readUserAccount.useCase.js';

export class ReadUserAccountController{

	constructor(
		private readUserAccountUseCase: ReadUserAccountUseCase
	){}

	async handle(req: Request, res: Response): Promise<void>{
		const userInfo = res.locals.userInfo;
		const userAccount = await this.readUserAccountUseCase.execute(userInfo);
		res.send(userAccount).status(200);
	}
}