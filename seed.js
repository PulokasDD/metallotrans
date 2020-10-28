import mongoose from 'mongoose';
import Admin from './models/admin.js';
import Customer from './models/customer.js';
import Product from './models/product.js';
import sha256 from 'sha256';

mongoose.connect('mongodb://localhost:27017/metallotrans', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed(entries, collection) {
  await mongoose.connection.dropDatabase();

  await collection.insertMany(entries);

  await mongoose.disconnect();
}

const admin1 = new Admin({
  login: '123@mail.ru',
  password: sha256('123'),
  name: 'Pyotr',
});

const customer1 = new Customer({
  email: '456@mail.ru',
  phone: '+456',
  name: 'Niko',
});

const product1 = new Product({
  title: 'труба',
  diameter: 256,
  quality: 'Б/У',
  price: 1000,
});

seed([admin1], Admin);
seed([customer1], Customer);
seed([product1], Product);
