import { User } from '../../entities/User.js';

type Method = 'cashin' | 'cashout'

export type Filters = {
	method?: Method
}

export interface IReadUserTransactionsDTO{
	user:User
	filter?:Filters; 
} 