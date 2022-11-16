import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import routers from './routers/routers.js';
import { ErrorHandlerMiddleware } from './middlewares/errorHandleMiddleware.js';
dotenv.config();

const errorHandler = new ErrorHandlerMiddleware();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routers);
app.use(errorHandler.getError);
export default app;