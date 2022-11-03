const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  firstName: String,
  lastName: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  }
});

module.exports = mongoose.model('User', userSchema, 'users');