import { Request,Response,NextFunction } from 'express';

export interface ISchemas{
	validate(req: Request, res: Response, next: NextFunction): Promise<Response>
}