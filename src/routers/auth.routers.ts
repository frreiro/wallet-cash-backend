import { Router } from 'express';
import {userController, userSchemas} from '../implementations/user.js';
import { Request, Response} from 'express';
import { createUserController, createUserMiddleware } from '../useCases/createUser/index.js';

//TODO: mover o validate para dentro da que função
const authRouters: Router = Router();

authRouters.post('/signup', 
	async (req: Request, res: Response) => {
		await createUserMiddleware.handle(req, res);
		await createUserController.handle(req, res);
	});

authRouters.post('/signin', 
	//userSchemas.authSchema().validate, 
	async (req: Request, res: Response) => {
		await userController.login(req, res);
	});

export default authRouters;

