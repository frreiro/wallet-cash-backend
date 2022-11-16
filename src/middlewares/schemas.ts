import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export abstract class Schemas {
	protected abstract setSchemaObject(): Joi.ObjectSchema;

	async validate(req: Request, res: Response, next: NextFunction){
		const { error } = this.setSchemaObject().validate(req.body, { abortEarly: false });
		if (error) {
			return res.status(422).send(error.details.map(detail => detail.message));
		}
		next();
	}

}