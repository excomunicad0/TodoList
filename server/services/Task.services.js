const { Task } = require('../db/models');

class TaskServices {
  static getAllTask = async () =>
    (await Task.findAll()).map((task) => task.get());

  static getTaskById = async (id) => {
    const task = await Task.findByPk(id);
    return task ? task.get() : null;
  };

  static getTaskName = async (title) => {
    const task = await Task.findOne({ where: { title } });
    return task ? task.get() : null;
  };

  static createTask = async ({ title, description, isCompleted }) => {
    const task = await Task.create({ title, description, isCompleted });
    return task;
  };

  static updateTask = async (
    id,
    userId,
    { title, description, isCompleted }
  ) => {
    let task;
    task = await Task.findOne({ where: { id, userId } });
    task = await Task.update(
      { title, description, isCompleted },
      { where: { id, userId } }
    );
    task = await Task.findByPk(id);
    return task ? task.get() : null;
  };

  static deleteTask = async (id, userId) => {
    const task = await Task.findOne({ where: { id, userId } });
    if (task) {
      await task.destroy();
      return true;
    }
    return false;
  };
}

module.exports = TaskServices;
