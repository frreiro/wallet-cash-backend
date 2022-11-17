import { Request,Response } from 'express';
import { CreateUserMiddleware } from './createUser.middleware.js';
import { CreateUserUseCase } from './createUser.useCase.js';

export class CreateUserController {

	constructor(
		private createUserUseCase: CreateUserUseCase,
	){}

	async handle(req: Request, res: Response): Promise<void>{
		const {username, password} = req.body;
		await this.createUserUseCase.execute({
			username,
			password
		});
		res.sendStatus(201);
	}

}