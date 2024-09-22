const { Task } = require('../db/models');

class TaskServices {
  static getAllTask = async () =>
    (await Task.findAll()).map((task) => task.get());

  static getTaskById = async (id) => {
    const task = await Task.findByPk(id);
    return task ? task.get() : null;
  };

  static getAllTaskByUser = async (userId) => {
    const tasks = await Task.findAll({ where: { userId } });
    return tasks;
  };

  static getTaskName = async (title) => {
    const task = await Task.findOne({ where: { title } });
    return task ? task.get() : null;
  };

  static createTask = async ({
    title,
    description,
    isCompleted,
    userId,
    categoryId,
    priorityId,
  }) => {
    const task = await Task.create({
      title,
      description,
      isCompleted,
      userId,
      categoryId,
      priorityId,
    });
    return task;
  };

  static updateTask = async (id, { title, description, isCompleted }) => {
    let task;
    task = await Task.findOne({ where: { id } });
    task = await Task.update(
      { title, description, isCompleted },
      { where: { id } }
    );
    task = await Task.findByPk(id);
    return task ? task.get() : null;
  };

  static deleteTask = async (id) => {
    const task = await Task.findByPk(id);
    // task = await Task.findOne({ where: { id, userId } });
    if (task) {
      await task.destroy();
      return true;
    }
    return false;
  };
}

module.exports = TaskServices;
