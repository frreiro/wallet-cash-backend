import Joi from 'joi';
import { ISchemas } from '../ISchemas.js';
import { IUserInput } from './IUserServices.js';

export interface IUserSchemas extends ISchemas{
	authSchema(): void
}