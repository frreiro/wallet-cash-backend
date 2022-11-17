import { Request, Response } from 'express';
import { LogUserUseCase } from './logUser.useCase.js';

export class LogUserController {

	constructor(
		private logUserUseCase: LogUserUseCase,
	){}
	
	async handle(req: Request, res: Response): Promise<void>{
		const {username, password} = req.body;
		const token = await this.logUserUseCase.execute({
			username,
			password
		});
		res.send(token).status(200);
	}
}