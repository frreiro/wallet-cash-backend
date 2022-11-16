import jwt from 'jsonwebtoken';
import { ITokenPayload, ITokenHandler } from '../interfaces/Utils/ITokenHandler.js';
import AppError from './appError.js';

export class TokenHandler implements ITokenHandler{
	public JWT_KEY = process.env.JWT_KEY;

	createToken(tokenPayload: ITokenPayload): string {
		const token  = jwt.sign(tokenPayload, this.JWT_KEY,{expiresIn: '24h'});
		return token;
	}

	async validateToken(token: string): Promise<ITokenPayload>{
		try {
			const tokenPayload = <ITokenPayload>jwt.verify(token, this.JWT_KEY);
			return tokenPayload;
		} catch (e) {
			throw new AppError('Invalid token', 401);
		}
	}

}