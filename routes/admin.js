import express from 'express';
import Admin from '../models/admin.js';
import sha256 from 'sha256';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin');
});

router.get('/administratorpanel', (req, res) => {
  if (req.session.admin) {
    res.render('adminPanel');
  } else {
    res.redirect('/');
  }
});

router.get('/administratorpanel/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/', async (req, res) => {
  const {
    login,
    password
  } = req.body;
  const administartor = await Admin.findOne({
    login
  }).lean();
  console.log(administartor);
  console.log(login);
  console.log(password);
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
