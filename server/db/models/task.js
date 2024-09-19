'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ User, Category, Priority }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.belongsTo(Priority, { foreignKey: 'priorityId' });
    }
  }
  Task.init(
    {
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      isCompleted: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      priorityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
