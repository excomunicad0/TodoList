const categoryController = require('../controllers/categoryController');

const router = require('express').Router();

router
  .route('/')
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategoryId)
  .put(categoryController.putCategory)
  .delete(categoryController.deleteCategory)

module.exports = router;
