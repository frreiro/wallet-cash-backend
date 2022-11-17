import { Users } from '@prisma/client';

export type ICreateUserDTO =  Omit<Users, 'id'|'accountId'>