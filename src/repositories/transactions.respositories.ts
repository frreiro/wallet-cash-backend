import { ITransactionDBReturn, ITransactionsRepositories } from './interfaces/ITransactionsRepositories.js';
import { prisma } from '../config/database.js';
import { Transaction } from '../entities/Transactions.js';
import { Filters } from '../useCases/readUserTransactions/readUserTransactons.DTO';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

export class TransactionRepositories implements ITransactionsRepositories{







	async findByUserIdAndOrFilter(userId: number, filter?: Filters): Promise<ITransactionDBReturn[]> {
		const buildFilter: Prisma.TransactionsWhereInput = {};
		const day = dayjs.utc(filter.date).format('YYYY-MM-DDT00:00:00[Z]');
		const dayAfter = dayjs.utc(filter.date).add(1,'day').format('YYYY-MM-DDT00:00:00[Z]');
		
		if(filter.date){
			buildFilter.createdAt = {
				gte: new Date(day),
				lte: new Date(dayAfter)

			};
		}

		if(filter.method === 'cashout'){
			buildFilter.debitedAccount = {
				user: {
					id: userId,
				}
			};
		}

		if(filter.method === 'cashin'){
			buildFilter.creditedAccount = {
				user: {
					id: userId,
				}
			};
		}

		return await prisma.transactions.findMany({
			where: {
				...buildFilter
			},
			select: {
				debitedAccount: {
					select: {
						user: {
							select: {
								id: true,
								username: true,
								accountId: true,
							}
						}
					}
				},
				creditedAccount: {
					select: {
						user: {
							select: {
								id: true,
								username: true,
								accountId: true,
							}
						}
					}
				},
				value: true,
				id:true,
				createdAt: true
			}
		});
	}


	async insert(transaction: Omit<Transaction,'id'| 'createdAt'>) {
		await prisma.transactions.create({
			data: transaction
		});
	}
	
}