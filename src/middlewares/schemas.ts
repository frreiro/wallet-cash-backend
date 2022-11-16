import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ISchemas } from '../interfaces/ISchemas.js';

export abstract class Schemas implements ISchemas {
	protected abstract schema: Joi.ObjectSchema;

	async validate(req: Request, res: Response, next: NextFunction){
		const { error } = this.schema.validate(req.body, { abortEarly: false });
		if (error) {
			return res.status(422).send(error.details.map(detail => detail.message));
		}
		next();
	}

}