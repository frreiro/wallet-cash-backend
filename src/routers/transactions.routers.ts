import { Router,Request,  Response, NextFunction } from 'express';
import { accountControllers } from '../implementations/account.js';
import { tokenMiddleware, transactionSchema } from '../implementations/transactions.js';
import { createTransactionController, createTransactionMiddleware } from '../useCases/createTransaction/index.js';

const transactionsRouters = Router();


transactionsRouters.use(async (req: Request, res: Response, next: NextFunction) => {
	await tokenMiddleware.init(req, res, next);
});

transactionsRouters.get('/account',
	async (req, res) => {
		await accountControllers.getBalance(req, res);
	});

transactionsRouters.post('/transactions', 
	async (req: Request, res: Response, next: NextFunction) => {
		await createTransactionMiddleware.handle(req, res, next);
	},
	async (req: Request, res: Response) => {
		await createTransactionController.handle(req, res);
	});

export default transactionsRouters;