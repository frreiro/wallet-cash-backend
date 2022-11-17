import Joi from 'joi';
import { IUserSchemas } from '../interfaces/User/IUserSchemas.js';
import { IUserInput } from '../interfaces/User/IUserServices.js';
import { Schemas } from '../middlewares/schemas.js';

export class UserSchemas extends Schemas implements IUserSchemas{
	public schema: Joi.ObjectSchema;	

	public authSchema(){
		this.schema = Joi.object<IUserInput>({
			username: Joi.string().min(3).required(),
			password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/).required()
		});
		return this.schema;
	}
	
}