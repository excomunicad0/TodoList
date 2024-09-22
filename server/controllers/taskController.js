const TaskServices = require('../services/Task.services');

exports.getTasks = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    // const tasks = await TaskServices.getAllTask();
    const tasks = await TaskServices.getAllTaskByUser(userId);
    res.status(200).json({ message: 'success', tasks });
  } catch ({ message }) {
    console.log(message, 'error tasks get');
    res.status(500).json({ message });
  }
};

exports.getTaskId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const task = await TaskServices.getTaskById(id);
    if (!task || task.userId !== userId) {
      return res
        .status(404)
        .json({ message: 'Задача не найдена или доступ запрещён' });
    }
    res.status(200).json({ message: 'success', task });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, isCompleted, categoryId, priorityId } =
      req.body;
    // add test
    const userId = res.locals.user.id;
    const task = await TaskServices.createTask({
      title,
      description,
      isCompleted,
      userId,
      categoryId,
      priorityId,
    });
    res.status(201).json({ message: 'success', task });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.putCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    const task = await TaskServices.getTaskById(id);
    if (task) {
      res.status(400).json({ message: 'Такой задачи нет' });
    }
    console.log(task);

    task.isCompleted = isCompleted;
    await task.save();
    res.status(200).json(task);
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.putTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    const task = await TaskServices.updateTask(id, {
      title,
      description,
      isCompleted,
    });
    if (task) {
      res.status(200).json({ message: 'success', task });
      return;
    }
    res.status(400).json({ message: 'Такой задачи не существует' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = res.locals;

    const task = await TaskServices.getTaskById(id);

    if (!task) {
      return res.status(400).json({ message: 'Такой задачи не существует' });
    }

    if (task.userId !== user.id) {
      return res.status(403).json({ message: 'У тебя нет прав' });
    }

    await TaskServices.deleteTask(id, user.id);
    return res.status(200).json({ message: 'success' });
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};
