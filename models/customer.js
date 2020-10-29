import mongoose from 'mongoose';

const CustomerSchema = mongoose.Schema({
  email: { type: String, required: true },
  phone: String,
  name: String,
  about: String,
});

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;
// import { Schema, model } from 'mongoose';

// const CustomerSchema = mongoose.Schema({
//   email: { type: String, required: true },
//   surname: String,
//   name: String,
//   patronymic: String,
//   phone: String,
// });
