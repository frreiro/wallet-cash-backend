import { Users } from '@prisma/client';

export type IUserInput =  Omit<Users, 'id'|'accountId'>

export interface IUserServices {
	createUser(userInfo: IUserInput): Promise<void>;
	logUser(userInfo: IUserInput):  Promise<string>
}