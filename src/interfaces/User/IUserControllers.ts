import {Request, Response} from 'express';

export interface IUserControllers{
	create(req: Request,res: Response): Promise<void>
	//login(req: Request,res: Response): Promise<void>
}