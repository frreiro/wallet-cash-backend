import {  NextFunction, Request, Response } from 'express';
import { IUserRepositories } from '../interfaces/User/IUserRepositories.js';
import { ITokenPayload } from '../interfaces/Utils/ITokenHandler.js';
import { ITokenMiddleware, IUserPayload } from '../interfaces/Utils/ITokenMiddleware.js';
import AppError from '../utils/appError.js';
import { TokenHandler } from '../utils/token.js';

export class TokenMiddlware extends TokenHandler implements ITokenMiddleware{

	constructor(
		private userRespositories: IUserRepositories,
	){
		super();
	}
	
	async init(req: Request,res: Response, next: NextFunction): Promise<void>{
		const token = await this.getToken(req.headers);
		const tokenPayload = await this.validateToken(token);
		const userData = await this.validateTokenPayload(tokenPayload);

		res.locals.userInfo = userData;
		next();
	}

	async getToken(headers: Request['headers']): Promise<string> {
		const { authorization } = headers;
		if (!authorization) throw new AppError('No headers found', 401);
		const token = authorization?.replace('Bearer ', '').trim();
		if (token === 'undefined' || null || undefined) throw new AppError('No token found', 401);
		return token;
	}

	async validateTokenPayload(tokenPayload: ITokenPayload): Promise<IUserPayload>{
		const {id, accountId} = tokenPayload;
		if(!id || !accountId) throw new AppError('Invalid token', 404);
		const {password,...user} = await this.userRespositories.findByIdAndAccoutId(id, accountId);
		if(!user) throw new AppError('Invalid token', 404);
		return user;
	}
}