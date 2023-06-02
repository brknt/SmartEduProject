const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/',roleMiddleware(['teacher','admin']), courseController.createCourse);
router.get('/',courseController.getAllCourses);
router.get('/:slug',courseController.getCourse); //   localhost:3000/courses/:id

module.exports ={
    routes:router
};