import Joi,{ObjectSchema } from 'joi';
import { ITransactionInput } from '../interfaces/Account/IAccountServices.js';
import { Schemas } from '../middlewares/schemas.js';

export class TransactionSchema extends Schemas{
	protected schema: ObjectSchema;

	
	public transactionSchema(){
		this.schema = Joi.object<ITransactionInput>({
			amount: Joi.number().required(),
			username: Joi.string().min(3).required()
		});
		return this;
	}
}