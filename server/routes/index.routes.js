const router = require('express').Router();

const tokensRouter = require('./tokens.routes');
const authRouter = require('./auth.routes');
const tasksRouter = require('./task.routes');

router.use('/auth', authRouter);
router.use('/tokens', tokensRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
