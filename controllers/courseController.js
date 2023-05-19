const Course = require('../models/Course');

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});

    res.status(200).render('courses',{
      courses,
      page_name: 'courses'
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
};
