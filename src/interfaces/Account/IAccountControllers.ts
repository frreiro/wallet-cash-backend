import { Request, Response } from 'express';

export interface IAccountControllers {
	getBalance(req: Request, res: Response): Promise<void>
	createTransfer(req: Request, res: Response): Promise<void>
}