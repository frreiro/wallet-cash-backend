import jwt from 'jsonwebtoken';
import { IUserRepositories } from '../../repositories/interfaces/IUserRepositories.js';
import AppError from '../../utils/appError.js';
import { ITokenHandlerDTO } from './tokenHandler.DTO.js';


export class TokenHandlerUseCase{
	public JWT_KEY = process.env.JWT_KEY;

	constructor(
		private userRespositories: IUserRepositories,
	){}

	async execute(token: string){
		const tokenPayload = await this.validateToken(token);
		const userData = await this.validateTokenPayload(tokenPayload);
		return userData;
	}

	async validateTokenPayload(tokenPayload: ITokenHandlerDTO){
		const {id, accountId} = tokenPayload;
		if(!id || !accountId) throw new AppError('Invalid token', 404);
		const {password,...user} = await this.userRespositories.findByIdAndAccoutId(id, accountId);
		if(!user) throw new AppError('Invalid token', 404);
		return user;
	}
	
	async validateToken(token: string){
		try {
			const tokenPayload = <ITokenHandlerDTO>jwt.verify(token, this.JWT_KEY);
			return tokenPayload;
		} catch (e) {
			throw new AppError('Invalid token', 401);
		}
	}

	createToken(tokenPayload: ITokenHandlerDTO){
		const token  = jwt.sign(tokenPayload, this.JWT_KEY,{expiresIn: '24h'});
		return token;
	}


}