const mongoose = require('mongoose');

const connectDB = () => {

    try {
        return mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        
    } catch (err) {
        throw err
    }
}

module.exports = connectDB