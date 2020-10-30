/* eslint-disable import/extensions */
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import sha256 from 'sha256';
import Handlebars from 'hbs';

import indexRouter from './routes/index.js';
import priceRouter from './routes/price.js';
import adminRouter from './routes/admin.js';

import seedNow from './seed.js';

// import Admin from './models/admin.js';
// import Customer from './models/customer.js';
// import Product from './models/product.js';

const app = express();

mongoose.connect('mongodb+srv://Ilya:12123@cluster0.fjvtz.mongodb.net/metallotrans?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('OKOKOK');
});

seedNow();

// view engine setup
app.set('view engine', 'hbs');

Handlebars.registerHelper('inc', (val) => val + 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static('public'));

app.use(
  session({
    secret: 'metallotrans',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 30,
    },
  }),
);

app.use((req, res, next) => {
  res.locals.admin = req.session.admin;
  // console.log(res.locals.admin);
  next();
});

app.use('/', indexRouter);
app.use('/price', priceRouter);
app.use('/admin', adminRouter);

const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;
// npm i -S handlebars
