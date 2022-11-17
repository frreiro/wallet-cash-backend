import { Users } from '@prisma/client';

export class User implements Users{
	public readonly id: number;
	
	public username: string;
	public password: string;
	public accountId: number;

	constructor(user: Omit<Users, 'id'>){
		Object.assign(this, user);
	}
}