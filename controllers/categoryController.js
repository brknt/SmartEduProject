const Category = require('../models/Category');

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


const deleteCategory = async (req, res) => {
  try {
    console.log(req.params.id);
    await Category.findByIdAndRemove(req.params.id);
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
    createCategory,
    deleteCategory    
}