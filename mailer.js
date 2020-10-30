import nodemailer from 'nodemailer';
import gbs from 'nodemailer-express-handlebars';
import Product from './models/product.js';
import Handlebars from 'hbs';

Handlebars.registerHelper('inc', (val) => val + 1);

const options = {
  viewEngine: {
    extname: '.hbs', // handlebars extension
    layoutsDir: 'views', // location of handlebars templates
    defaultLayout: 'layout', // name of main template
    partialsDir: 'views', // location of your subtemplates aka. header, footer etc
  },
  viewPath: 'views',
  extName: '.hbs',
};

async function main(towhom) {
  let mailAccount = await nodemailer.createTestAccount();
  const data = await Product.find().lean();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'metallotransnew@gmail.com',
      pass: '@123qwerty',
    },
  });

  transporter.use('compile', gbs(options));

  const info = await transporter.sendMail({
    from: 'Max Che', // sender address
    to: `${towhom}`, // list of receivers
    subject: 'Hello ✔ Test', // Subject line
    template: 'index', // plain text body
    context: {
      data,
    }, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default main;
