import { Router,Request,  Response, NextFunction } from 'express';
import { accountControllers } from '../implementations/account.js';
import { tokenMiddleware, transactionSchema } from '../implementations/transactions.js';

const transactionsRouters = Router();


transactionsRouters.use(async (req: Request, res: Response, next: NextFunction) => {
	await tokenMiddleware.init(req, res, next);
});

transactionsRouters.get('/account',
	async (req, res) => {
		await accountControllers.getBalance(req, res);
	});

transactionsRouters.post('/transactions',
	transactionSchema.transactionSchema().validate,
	async (req, res) => {
		await accountControllers.createTransfer(req, res);
	});


export default transactionsRouters;