const router = require('express').Router();
const taskController = require('../controllers/taskController');
const verifyAccessToken = require('../middleware/verifyAccessToken');

router.route('/').get(taskController.getTasks).post(taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTaskId)
  .put(taskController.putTask)
  .delete(verifyAccessToken, taskController.deleteTask);

module.exports = router;
