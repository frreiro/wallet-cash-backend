import Joi from 'joi';
import { ILogUserDTO } from '../logUser.DTO.js';

const logUserSchema = Joi.object<ILogUserDTO>({
	username: Joi.string().min(3).required(),
	password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/).required()
});

export {logUserSchema};