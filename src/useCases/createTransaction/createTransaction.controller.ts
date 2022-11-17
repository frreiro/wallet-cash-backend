import { Request, Response } from 'express';
import { CreateTransactionUseCase } from './createTransaction.useCase.js';

export class CreateTransactionController{

	constructor(
		private createTransactionUseCase: CreateTransactionUseCase
	){}

	async handle(req: Request, res: Response){
		const userInfo = res.locals.userInfo;
		const body = req.body;
		await this.createTransactionUseCase.execute({
			debitedUsername: userInfo.username,
			creditedUsername: body.username,
			value: body.value
		});
		res.sendStatus(201);
	}
}