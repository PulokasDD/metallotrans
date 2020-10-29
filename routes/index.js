/* eslint-disable import/extensions */
import express from 'express';
import Product from '../models/product.js';
import Customer from '../models/customer.js';

const router = express.Router();
/* GET home page. */
router.get('/', async (req, res) => {
  const arrProduct = await Product.find();
  const arrCustomer = await Customer.find();
  res.render('index', { arrProduct, arrCustomer });
});

export default router;
