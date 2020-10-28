import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin');
});

router.post('/', (req, res) => {});

export default router;
