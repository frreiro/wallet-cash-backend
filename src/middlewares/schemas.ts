import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export abstract class Schemas{
	protected abstract schema: Joi.ObjectSchema;

	public validate = (req: Request, res: Response, next: NextFunction) => {
		const { error } = this.schema.validate(req.body, { abortEarly: false });
		if (error) {
			return res.status(422).send(error.details.map(detail => detail.message));
		}
		next();
	};
}