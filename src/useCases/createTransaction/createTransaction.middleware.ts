import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppError from '../../utils/appError.js';
import { ICreateTransactionSchemaDTO } from './schema/createTransaction.schema.DTO.js';

export class CreateTransactionMiddleware{
	constructor(
		private createTransactionSchema: Joi.ObjectSchema<ICreateTransactionSchemaDTO>,
	){}

	async handle(req: Request, res: Response,next: NextFunction): Promise<void>{
		const {error} = this.createTransactionSchema.validate(req.body);
		if(error) throw new AppError(error.details.map(detail => detail.message).join(''), 422);
		next();
	}
}