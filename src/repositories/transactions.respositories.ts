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
		const dayAfter = dayjs.utc(filter.date).add(1,'day').format('YYYY-MM-DDTHH:mm:ss[Z]');

		
		if(filter.date){
			buildFilter.createdAt = {
				gte: new Date(filter.date),
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

		if(filter.method != 'cashin' && filter.method !== 'cashout'){
			buildFilter.OR = [
				{
					creditedAccount : {
						user: {
							id: userId
						}
					}
				},
				{
					debitedAccount: {
						user: {
							id: userId
						}
					}
				}
			];
		}

		return await prisma.transactions.findMany({
			orderBy: {
				createdAt: 'desc'
			},
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