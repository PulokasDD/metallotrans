import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import sha256 from 'sha256';

import indexRouter from './routes/index.js';
import priceRouter from './routes/price.js';
import adminRouter from './routes/admin.js';

// import Admin from './models/admin';
// import Customer from './models/customer';
import Product from './models/product.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/metallotrans', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// view engine setup
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(
  session({
    secret: 'metallotrans',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 30 },
  })
);

app.use((req, res, next) => {
  res.locals.admin = req.session.admin;
  console.log(res.locals.admin);
  next();
});

app.use('/', indexRouter);
app.use('/price', priceRouter);
app.use('/admin', adminRouter);

const port = process.env.port || 3000;
// CODE:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/show', async (req, res) => {
  const data = await Product.find();
  res.send(data);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;
