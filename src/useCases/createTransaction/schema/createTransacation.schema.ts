import Joi from 'joi';
import { ICreateTransactionSchemaDTO } from './createTransaction.schema.DTO.js';

const createTransactionSchema = Joi.object<ICreateTransactionSchemaDTO>({
	username: Joi.string().min(3).required(),
	value: Joi.number().min(1).required()
});

export {createTransactionSchema};