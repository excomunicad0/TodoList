const router = require('express').Router();
const taskController = require('../controllers/taskController');

router
    .route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTaskId)
  .put(taskController.putTask)
  .delete(taskController.deleteTask);

module.exports = router;
