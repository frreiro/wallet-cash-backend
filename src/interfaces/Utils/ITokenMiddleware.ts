import { NextFunction, Request, Response } from 'express';
import { ITokenHandler, ITokenPayload } from './ITokenHandler.js';

export interface ITokenMiddleware extends ITokenHandler{
	init(req: Request,res: Response, next: NextFunction): Promise<void>
	getToken(headers: Request['headers']): Promise<string>
	validateTokenPayload(tokenPayload: ITokenPayload): Promise<void>

}