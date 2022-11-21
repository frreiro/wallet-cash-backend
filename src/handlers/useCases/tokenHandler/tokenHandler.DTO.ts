import { Users } from '@prisma/client';

export type ITokenHandlerDTO = Omit<Users,'username'| 'password'> ;