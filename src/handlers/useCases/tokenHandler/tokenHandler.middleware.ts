import { NextFunction, Request, Response } from 'express';
import AppError from '../../../utils/appError.js';
import { TokenHandlerUseCase } from './tokenHandler.useCase.js';

export class TokenHandlerMiddleware{

	constructor(
		private tokeHandlerUseCase: TokenHandlerUseCase
	){}

	async handle(req: Request, res: Response, next: NextFunction): Promise<void>{
		const { authorization } = req.headers;
		if (!authorization) throw new AppError('No headers found', 401);
		const token = authorization?.replace('Bearer ', '').trim();
		if (token === 'undefined' || null || undefined) throw new AppError('No token found', 401);

		const userData = await this.tokeHandlerUseCase.execute(token);
		res.locals.userInfo = userData;
		next();
	}
}