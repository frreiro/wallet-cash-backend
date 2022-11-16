import {Router} from 'express';
import authRouters from './auth.routers.js';

const routers = Router();

routers.use(authRouters);

routers.get('/health', (req, res) => {
	res.send(200);
});

export default routers;