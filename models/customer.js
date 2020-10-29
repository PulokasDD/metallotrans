import mongoose from 'mongoose';

const CustomerSchema = mongoose.Schema({
  email: { type: String, required: true },
  phone: String,
  name: String,
});

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;

