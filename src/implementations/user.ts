import { UserServices } from '../services/user.services.js';
import { UserControllers } from '../controllers/auth.controllers.js';
import { UserRespositories } from '../repositories/users.repositories.js';
import { TokenHandler } from '../utils/token.js';
import { AccountServices } from '../services/account.services.js';
import { UserSchemas } from '../schemas/user.schemas.js';
import { AccountRepositories } from '../repositories/account.repositories.js';

const accountRepositories = new AccountRepositories();
const accountServices = new AccountServices(
	accountRepositories
);
const tokenHandler = new TokenHandler();
const userRespositories = new UserRespositories();
	
const userServices = new UserServices(
	userRespositories,
	accountServices,
	tokenHandler,
);

const userController =  new UserControllers(
	userServices
);


const userSchemas = new UserSchemas();




export {
	userController,
	userSchemas
};