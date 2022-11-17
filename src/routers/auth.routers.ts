import { NextFunction, Router } from 'express';
import { Request, Response} from 'express';
import { createUserController, createUserMiddleware } from '../useCases/createUser/index.js';
import { logUserController, logUserMiddleware } from '../useCases/logUser/index.js';

const authRouters: Router = Router();

authRouters.post('/signup', 
	async (req: Request, res: Response, next: NextFunction) => {
		await createUserMiddleware.handle(req, res, next);
	},
	async (req: Request, res: Response) => {
		await createUserController.handle(req, res);
	});

authRouters.post('/signin', 
	async (req: Request, res: Response, next: NextFunction) => {
		await logUserMiddleware.handle(req, res, next);
	},
	async (req: Request, res: Response) => {
		await logUserController.handle(req, res);
	});

export default authRouters;

