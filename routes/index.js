/* eslint-disable import/extensions */
import express from 'express';
import Product from '../models/product.js';

const router = express.Router();
/* GET home page. */
router.get('/', async (req, res) => {
  const data = await Product.find();
  res.render('index', { data });
});

export default router;
