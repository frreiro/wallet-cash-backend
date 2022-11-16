import { TokenMiddlware } from '../middlewares/tokenMiddleware.js';
import { UserRespositories } from '../repositories/users.repositories.js';

const userRespositories = new UserRespositories();
const tokenMiddleware = new TokenMiddlware(
	userRespositories
);

export {
	tokenMiddleware,
};