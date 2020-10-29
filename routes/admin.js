import express from 'express';
import Admin from '../models/admin.js';
import Customer from '../models/customer.js';
import Product from '../models/product.js';
import sha256 from 'sha256';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin');
});

router.get('/administratorpanel', async (req, res) => {
  const products = await Product.find({});
  const users = await Customer.find({});
  console.log(products);
  console.log(users);
  if (req.session.admin) {
    res.render('adminPanel', { products, users });
  } else {
    res.redirect('/');
  }
});

// добавление юзеров
router.post('/administratorpanel/user', async (req, res) => {
  const {
    emailCustomer,
    phoneCustomer,
    nameCustomer,
    aboutCustomer,
  } = req.body;

  const newCustomer = new Customer({
    email: emailCustomer,
    phone: phoneCustomer,
    name: nameCustomer,
    about: aboutCustomer,
  });

  const emailCheck = await Customer.findOne({ email: emailCustomer });
  const phoneCheck = await Customer.findOne({ phone: phoneCustomer });

  if (emailCheck) {
    return res.status(400).send('Customer with this email already registered');
  } else if (phoneCheck) {
    return res.status(400).send('Customer with this phone already registered');
  } else {
    await newCustomer.save();
  }
  return res.end();
});

// добавление товара
router.post('/administratorpanel/product', async (req, res) => {
  const { title, diameter, quality, price } = req.body;
  const newProduct = new Product({ title, diameter, quality, price });
  if (newProduct) {
    await newProduct.save();
  } else {
    return res.status(400).send('all fields must be filled');
  }
  return res.end();
});

router.get('/administratorpanel/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin');
});

router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const administartor = await Admin.findOne({ login }).lean();
  // console.log(administartor);
  // console.log(login);
  // console.log(password);
  if (administartor) {
    if (sha256(password) === administartor.password) {
      req.session.admin = administartor.login;
      res.status(200).send('success');
    }
  } else {
    res.status(400).send('incorrect');
  }
});

export default router;
