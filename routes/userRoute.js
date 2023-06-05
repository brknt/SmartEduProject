const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.post(
  '/signup',
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),

    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists!');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('Please Enter Your Password'),
  ],
  authController.createUser
); //   localhost:3000/users/signup
router.post('/login', authController.loginUser); //   localhost:3000/users/login
router.get('/logout', authController.logoutUser); //   localhost:3000/users/logout
router.get('/dashboard', authMiddleware, authController.getDashboardPage); //   localhost:3000/users/dashboard
router.delete('/:id',  authController.deleteUser); //   localhost:3000/users/dashboard





module.exports = {
  routes: router,
};
