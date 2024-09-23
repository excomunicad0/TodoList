'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ Task }) {
      this.hasMany(Task, { foreignKey: 'categoryId' });
    }
  }
  Category.init(
    {
      name: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
