import express from 'express';
import itemRouter from './itemRoute';
import userRouter from './userRoute';

const allRoutes = express.Router();

allRoutes.use('/users', userRouter)
allRoutes.use('/items', itemRouter)

export default allRoutes;