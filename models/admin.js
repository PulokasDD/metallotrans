import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
// import { Schema, model } from 'mongoose';

// const AdminSchema = mongoose.Schema({
//   login: { type: String, required: true },
//   password: { type: String, required: true },
//   surname: String,
//   name: String,
//   patronymic: String,
//   email: String,
//   phone: String,
//   position: String,
// });
