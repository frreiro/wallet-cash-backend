import { Router,Request,  Response, NextFunction } from 'express';
import { tokenMiddleware } from '../implementations/transactions.js';

const transactionsRouters = Router();


transactionsRouters.use(async (req: Request, res: Response, next: NextFunction) => {
	await tokenMiddleware.init(req, res, next);
});

transactionsRouters.get('/account',
	async (req, res) => {
		res.sendStatus(200);
	});

export default transactionsRouters;