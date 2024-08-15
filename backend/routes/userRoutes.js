const express = require('express');
const router = express.Router();
const { userRegister, userLogin } = require('../controllers/userController.js');
const cartController = require('../controllers/cartController.js');

router.post('/login', userLogin, (req, res) => {
  console.log('login hit, route')
  res.status(200).json(res.locals.data);
});

router.post(
  '/register',
  userRegister,
  cartController.createCart,
  (req, res) => {
    res.status(200).json(res.locals.data);
  }
);

module.exports = router;
