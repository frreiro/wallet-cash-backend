import Joi from 'joi';
import { ICreateUserDTO } from './createUser.DTO.js';

export class UserSchemas{
	public schema: Joi.ObjectSchema;
	constructor(){
		this.schema = Joi.object<ICreateUserDTO>({
			username: Joi.string().min(3).required(),
			password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/).required()
		});
	}
}