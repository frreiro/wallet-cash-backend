import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import routers from './routers/routers.js';
import { errorHandlerMiddleware } from './middlewares/errorHandleMiddleware.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routers);

app.use(errorHandlerMiddleware);

export default app;