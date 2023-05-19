const express = require('express');
const userController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', userController.createUser); //   localhost:3000/users/signup
router.post('/login', userController.loginUser); //   localhost:3000/users/login


module.exports ={
    routes:router
};