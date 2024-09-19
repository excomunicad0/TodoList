'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Priority extends Model {
    static associate({ Task }) {
      this.hasMany(Task, { foreignKey: 'priorityId' });
    }
  }
  Priority.init(
    {
      level: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Priority',
    }
  );
  return Priority;
};
