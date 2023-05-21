const express = require('express');
const userController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', userController.createUser); //   localhost:3000/users/signup
router.post('/login', userController.loginUser); //   localhost:3000/users/login
router.get('/logout', userController.logoutUser); //   localhost:3000/users/logout
router.get('/dashboard', userController.getDashboardPage); //   localhost:3000/users/dashboard


module.exports ={
    routes:router
};