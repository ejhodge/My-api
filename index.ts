require('dotenv').config();

import allRoutes from "./src/routes/index";
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { connectDB } from './src/config/dbConn';
import { authMiddleware } from './src/middlewares/Auth-middleware';

const app = express();
const PORT = 4000;

app.use ( authMiddleware )

app.use ( bodyParser.json() )

connectDB();

app.get('/health', function(_req: Request, res: Response) {
    res.status(200).send('The API is up and running');
});

app.use('/', allRoutes)

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});