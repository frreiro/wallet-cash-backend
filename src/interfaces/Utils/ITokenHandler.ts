import { Users } from '@prisma/client';

export type Id = Users['id'];
export interface ITokenHandler{
	createToken(id: Id): string;
	validateToken(token: string): void;
}