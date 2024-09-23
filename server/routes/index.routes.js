const router = require('express').Router();

const tokensRouter = require('./tokens.routes');
const authRouter = require('./auth.routes');
const tasksRouter = require('./task.routes');
const categoryRouter = require('./category.routes');

router.use('/auth', authRouter);
router.use('/tokens', tokensRouter);
router.use('/tasks', tasksRouter);
router.use('/categories', categoryRouter);

module.exports = router;
