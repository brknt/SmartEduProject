const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

router.get('/', pageController.getIndexPage);
router.get('/about', pageController.getAboutPage);
router.get('/register', redirectMiddleware,pageController.getRegisterPage);
router.get('/login', redirectMiddleware, pageController.getLoginPage);

module.exports ={
    routes:router
};