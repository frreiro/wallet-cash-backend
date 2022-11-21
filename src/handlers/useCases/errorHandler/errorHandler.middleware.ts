
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import AppError from '../../../utils/appError.js';

export class ErrorHandlerMiddleware {


	async handle(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction){
		if (error instanceof AppError) {
			return res.status(error.statusCode).send({
				status: error.statusCode,
				message: error.message
			});
		}
	
		console.log(error);
	
		return res.status(500).send({
			status: 500,
			message: 'Internal server error',
		});
	}
}