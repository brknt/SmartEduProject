const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');

  } catch (error) {
    
    const errors = validationResult(req);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }
    res.status(400).redirect('/register');
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if(same){
        // USER SESSION
        // hangi userın giriş işlemi yaptığını bulalım:
        req.session.userID = user._id;
        res.status(200).redirect('/users/dashboard');
      } else {
        req.flash('error', 'Your password is not correct!');
        res.status(400).redirect('/login');

      }

      });
    } else{
      req.flash('error', 'User is not exists!');
      res.status(400).redirect('/login');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};


const getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate('courses');
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  const users = await User.find();

  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
    users
  });
};


const deleteUser = async (req, res) => {
  try {
    console.log(req.params.id);
    await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({user:req.params.id});
    // req.flash('error', `${course.name} has been removed successfuly`);

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getDashboardPage,
  deleteUser
};
