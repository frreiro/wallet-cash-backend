import { Router } from 'express';
import { UserControllers } from '../controllers/auth.controllers.js';
import { IUserControllers } from '../interfaces/User/IUserControllers.js';
import { UserSchemas } from '../schemas/user.schemas.js';

export default class AuthRouters{
	public userController: IUserControllers = new UserControllers();
	public authRouters: Router = Router();
	public userSchemas = new UserSchemas();

	constructor(){
		this.signup();
		this.singin();
	}

	async signup(){
		this.authRouters.post('/signup',this.userSchemas.authSchema().validate.bind(this.userSchemas),this.userController.create.bind(this.userController));
	}

	async singin(){
		this.authRouters.post('/signin', this.userSchemas.authSchema().validate.bind(this.userSchemas),this.userController.login.bind(this.userController));
	}

}
