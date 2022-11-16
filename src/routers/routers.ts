import {Router} from 'express';
import AuthRouters from './auth.routers.js';

const routers = Router();

routers.use(new AuthRouters().authRouters);

routers.get('/health', (req, res) => {
	res.send(200);
});

export default routers;