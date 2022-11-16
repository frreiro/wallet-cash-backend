import { Router,Request,  Response, NextFunction } from 'express';
import { accountControllers, tokenMiddleware } from '../implementations/transactions.js';

const transactionsRouters = Router();


transactionsRouters.use(async (req: Request, res: Response, next: NextFunction) => {
	await tokenMiddleware.init(req, res, next);
});

transactionsRouters.get('/account',
	async (req, res) => {
		await accountControllers.getBalance(req, res);
	});

export default transactionsRouters;