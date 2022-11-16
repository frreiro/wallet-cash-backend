import { IUserInsert, IUserRepositories } from '../interfaces/User/IUserRepositories.js';
import { prisma } from '../config/database.js';
import { Users } from '@prisma/client';

export class UserRespositories implements IUserRepositories{

	async insert(userInfo: IUserInsert): Promise<void>{
		await prisma.users.create({
			data:userInfo
		});
	}

	async findByUsername(username: string): Promise<Users> {
		return await prisma.users.findUnique({
			where: {
				username: username
			}
		});
	}

	async findByIdAndAccoutId(id: number, accountId: number): Promise<Users> {
		return await prisma.users.findFirst({
			where: {
				id: id,
				accountId: accountId
			}
		});
	}
}