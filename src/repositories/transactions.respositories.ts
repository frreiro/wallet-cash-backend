import { ITransactionDBReturn, ITransactionsRepositories, ITransactionVisualizer } from '../interfaces/Transactions/ITransactionsRepositories.js';
import { prisma } from '../config/database.js';
import { Transaction } from '../entities/Transactions.js';
import { Filters } from '../useCases/readUserTransactions/readUserTransactons.DTO.js';

export class TransactionRepositories implements ITransactionsRepositories{
	async findByUserId(userId: number) : Promise<ITransactionDBReturn[]> {
		return await prisma.transactions.findMany({
			where: {
				OR: [
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
				]
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
				id:true
			}
		});
	}
	async findByUserIdAndCashInFilter(userId: number): Promise<ITransactionDBReturn[]> {
		return await prisma.transactions.findMany({
			where: {
				creditedAccount : {
					user: {
						id: userId
					}
				}
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
				id:true
			}
		});
	}


	async findByUserIdAndCashOutFilter(userId: number): Promise<ITransactionDBReturn[]> {
		return await prisma.transactions.findMany({
			where: {
				debitedAccount: {
					user: {
						id: userId,
					}
				}
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
				id:true
			}
		});
	}
	async insert(transaction: Omit<Transaction,'id'| 'createdAt'>) {
		await prisma.transactions.create({
			data: transaction
		});
	}
	
}