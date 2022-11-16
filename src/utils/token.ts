import jwt from 'jsonwebtoken';
import { Id, ITokenHandler } from '../interfaces/Utils/ITokenHandler.js';
import AppError from './appError.js';

export class TokenHandler implements ITokenHandler{
	public JWT_KEY = process.env.JWT_KEY;

	createToken(id: Id): string {
		const token  = jwt.sign({id: id}, this.JWT_KEY,{expiresIn: '24h'});
		return token;
	}

	validateToken(token: string): number{
		try {
			const {id} = <{id: Id}>jwt.verify(token, this.JWT_KEY);
			return id;
		} catch (e) {
			new AppError('Invalid token', 401);
		}
	}
}