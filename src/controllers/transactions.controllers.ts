import { Request, response, Response } from 'express';
import { IAccountControllers } from '../interfaces/Account/IAccountControllers.js';
import { IAccountServices } from '../interfaces/Account/IAccountServices.js';

export class AccountControllers implements IAccountControllers{

	constructor(
		private accountServices: IAccountServices
	){}
	

	async getBalance(req: Request, res: Response): Promise<void>{
		const userInfo = res.locals.userInfo;
		const balance = await this.accountServices.getAccountBalance(userInfo.accountId);
		res.send({ ...userInfo, balance}).status(200);
	}

	async createTransfer(req: Request, res: Response): Promise<void> {
		const userInfo = res.locals.userInfo;
		const body = req.body;
		await this.accountServices.transferAmount(userInfo.username, body.username, body.amount);
		res.sendStatus(201);
	}

}