const express = require('express');
const allRoutes = express.Router();

const { itemRouter } = require('./itemRoute');
const { userRouter } = require('./userRoute');

allRoutes.use('/users', userRouter)
allRoutes.use('/items', itemRouter)

module.exports = { allRoutes: allRoutes }