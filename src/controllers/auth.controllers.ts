import { Request,Response } from 'express';
import { IUserControllers } from '../interfaces/User/IUserControllers.js';
import { IUserServices, IUserInput } from '../interfaces/User/IUserServices.js';
import { UserServices } from '../services/user.services.js';

export class UserControllers implements IUserControllers{
	public userServices: IUserServices = new UserServices();

	async create(req: Request, res: Response): Promise<void>{
		const userInfo: IUserInput = req.body;
		await this.userServices.createUser(userInfo);
		res.sendStatus(201);
	}

	async login(req: Request, res: Response): Promise<void>{
		const userInfo: IUserInput = req.body;
		const token = await this.userServices.logUser(userInfo);
		res.send(token).status(200);
	}
	
}