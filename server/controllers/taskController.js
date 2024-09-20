const TaskServices = require('../services/Task.services');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskServices.getAllTask();
    res.status(200).json({ message: 'success', tasks });
  } catch ({ message }) {
    console.log(message, 'error tasks get');
    res.status(500).json({ message });
  }
};

exports.getTaskId = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskServices.getTaskById(id);
    res.status(200).json({ message: 'success', task });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;
    // add test
    const task = await TaskServices.createTask({
      title,
      description,
      isCompleted,
    });
    res.status(201).json({ message: 'success', task });
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
    const task = await TaskServices.deleteTask(id);
    if (task) {
      res.status(200).json({ message: 'success' }, task);
      return;
    }
    res.status(400).json({ message: 'Такой задачи не существует' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};
