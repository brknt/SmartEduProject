const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.post('/', courseController.createCourse);
router.get('/',courseController.getAllCourses);
router.get('/:slug',courseController.getCourse); //   localhost:3000/courses/:id

module.exports ={
    routes:router
};