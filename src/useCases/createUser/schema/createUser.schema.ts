import Joi from 'joi';
import { ICreateUserDTO } from '../createUser.DTO.js';

const createUserSchema = Joi.object<ICreateUserDTO>({
	username: Joi.string().min(3).required(),
	password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/).required()
});

export {createUserSchema};