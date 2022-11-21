import { Router,Request,  Response, NextFunction } from 'express';
import { readUserAccountController } from '../useCases/readUserAccount/index.js';
import { tokenHandlerMiddleware } from '../handlers/useCases/tokenHandler/index.js';

const accountRouters = Router();


accountRouters.use(
	async (req: Request, res: Response, next: NextFunction) => {
		await tokenHandlerMiddleware.handle(req, res, next);
	});

accountRouters.get('/account',
	async (req, res) => {
		await readUserAccountController.handle(req, res);
	});


export default accountRouters;