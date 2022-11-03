require('dotenv').config();
const { allRoutes } = require('./src/routes/index')
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./src/config/dbConn');
const PORT = 4000;
const { authMiddleware } = require('./src/middlewares/Auth-middleware');

app.use ( authMiddleware )

app.use(bodyParser.json())

connectDB();

app.get('/health', function(req, res) {
    res.status(200).send('The API is up and running');
});

app.use('/', allRoutes)

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});