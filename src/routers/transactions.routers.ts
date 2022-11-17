import { Router,Request,  Response, NextFunction } from 'express';
import { createTransactionController, createTransactionMiddleware } from '../useCases/createTransaction/index.js';
import { readUserTransactionsController } from '../useCases/readUserTransactions/index.js';
import { tokenHandlerMiddleware } from '../useCases/tokenHandler/index.js';

const transactionsRouters = Router();


transactionsRouters.use(
	async (req: Request, res: Response, next: NextFunction) => {
		await tokenHandlerMiddleware.handle(req, res, next);
	});

transactionsRouters.post('/transactions', 
	async (req: Request, res: Response, next: NextFunction) => {
		await createTransactionMiddleware.handle(req, res, next);
	},
	async (req: Request, res: Response) => {
		await createTransactionController.handle(req, res);
	});


transactionsRouters.get('/transactions', 
	async (req: Request, res: Response) => {
		await readUserTransactionsController.handle(req, res);
	});

export default transactionsRouters;