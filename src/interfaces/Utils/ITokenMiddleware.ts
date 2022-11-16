import { Users } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ITokenHandler, ITokenPayload } from './ITokenHandler.js';

export type IUserPayload = Omit<Users, 'password'>
export interface ITokenMiddleware extends ITokenHandler{
	init(req: Request,res: Response, next: NextFunction): Promise<void>
	getToken(headers: Request['headers']): Promise<string>
	validateTokenPayload(tokenPayload: ITokenPayload): Promise<IUserPayload>

}