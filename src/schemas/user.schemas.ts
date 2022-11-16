import Joi from 'joi';
import { IUserSchemas } from '../interfaces/User/IUserSchemas.js';
import { IUserInput } from '../interfaces/User/IUserServices.js';
import { Schemas } from '../middlewares/schemas.js';

export class UserSchemas extends Schemas implements IUserSchemas{

	public setSchemaObject(): Joi.ObjectSchema<IUserInput> {
		return this.signupSchema();
	}
	

	public signupSchema(): Joi.ObjectSchema<IUserInput> {
		const signupSchema = Joi.object<IUserInput>({
			username: Joi.string().min(3).required(),
			password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/).required()
		});
		return signupSchema;
	}
}