const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post('/', categoryController.createCategory);
router.delete('/:id',  categoryController.deleteCategory); //   localhost:3000/users/dashboard


module.exports ={
    routes:router
};