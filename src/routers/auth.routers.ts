import { Router } from 'express';
import {userController, userSchemas} from '../implementations/user.js';
import { Request, Response} from 'express';

//TODO: mover o validate para dentro da que função
const authRouters: Router = Router();

authRouters.post('/signup', userSchemas.authSchema().validate,
	async (req: Request, res: Response) => {
		await userController.create(req, res);
	});

authRouters.post('/signin', 
	userSchemas.authSchema().validate, 
	async (req: Request, res: Response) => {
		await userController.login(req, res);
	});

export default authRouters;

