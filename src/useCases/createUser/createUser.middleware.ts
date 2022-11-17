import { Response,Request } from 'express';
import AppError from '../../utils/appError.js';
import { ICreateUserSchemasDTO } from './createUser.shema.DTO.js';

export class CreateUserMiddleware {

	constructor(
		private userSchema: ICreateUserSchemasDTO,
	){}

	async handle(req: Request, res: Response): Promise<void>{
		const {username, password} = req.body;
		const {error} = this.userSchema.schema.validate({
			username,
			password
		} );
		if(error) throw new AppError(error.details.map(detail => detail.message).join(''), 422);
	}
}