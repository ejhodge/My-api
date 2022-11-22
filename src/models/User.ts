import mongoose from 'mongoose';

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

export default mongoose.model('User', userSchema, 'users');