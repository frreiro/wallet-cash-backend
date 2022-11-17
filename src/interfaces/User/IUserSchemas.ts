import Joi  from 'joi';
import { Schemas } from '../../middlewares/schemas.js';

export interface IUserSchemas extends Schemas{
	authSchema(): Joi.ObjectSchema
}