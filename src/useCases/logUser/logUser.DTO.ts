import { Users } from '@prisma/client';

export type ILogUserDTO =  Omit<Users, 'id'|'accountId'>