const express = require('express');
const courseontroller = require('../controllers/courseController');

const router = express.Router();

router.post('/', courseontroller.createCourse);

module.exports ={
    routes:router
};