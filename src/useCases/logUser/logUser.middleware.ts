import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppError from '../../utils/appError.js';
import { ILogUserDTO } from './logUser.DTO.js';

export class LogUserMiddleware {

	constructor(
		private logUserSchema: Joi.ObjectSchema<ILogUserDTO>
	){}

	async handle(req: Request, res: Response,next: NextFunction): Promise<void>{
		const {error} = this.logUserSchema.validate(req.body);
		if(error) throw new AppError(error.details.map(detail => detail.message).join(''), 422);
		next();
	}
}