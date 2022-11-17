import {Router} from 'express';
import accountRouters from './accounts.routers.js';
import authRouters from './auth.routers.js';
import transactionsRouters from './transactions.routers.js';

const routers = Router();

routers.use(authRouters);
routers.use(transactionsRouters);
routers.use(accountRouters);


routers.get('/health', (req, res) => {
	res.send(200);
});

export default routers;