import { Users } from '@prisma/client';

export type ITokenPayload = Omit<Users,'username'| 'password'> ;
export interface ITokenHandler{
	createToken(tokenPayload: ITokenPayload): string;
	validateToken(token: string): void;
}