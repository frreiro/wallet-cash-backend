import { Request, Response } from 'express';
import { ReadUserTransactionsUseCase } from './readUserTransactions.useCase.js';

export class ReadUserTransactionsController {

	constructor(
		private readUserTransactionsUseCase: ReadUserTransactionsUseCase
	){}
	async handle(req: Request, res: Response){
		const userInfo = res.locals.userInfo;
		const filter = req.query;
		const userTransactions = await this.readUserTransactionsUseCase.execute({
			user: userInfo,
			filter: filter 
		});
		res.send(userTransactions).status(200);
	}
}