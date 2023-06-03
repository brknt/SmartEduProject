const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.post('/',roleMiddleware(['teacher','admin']), courseController.createCourse);
router.get('/',courseController.getAllCourses);
router.get('/:slug',courseController.getCourse); //   localhost:3000/courses/:id
router.post('/enroll',courseController.enrollCourse);
router.post('/release',courseController.releaseCourse);


module.exports ={
    routes:router
};