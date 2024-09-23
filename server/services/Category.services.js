const { Category } = require('../db/models');

class CategoryServices {
  static getAllCategory = async () =>
    (await Category.findAll()).map((catygory) => catygory.get());

  static getCategoryId = async (id) => {
    const category = await Category.findByPk(id);
    return category ? category.get() : null;
  };

  static createCategory = async ({ name }) => {
    const category = await Category.create({ name });
    return category;
  };

  static updateCategory = async (id, { name }) => {
    const category = await Category.update({ name }, { where: { id } });
    return category ? category : null;
  };

  static deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      return true;
    }
    return false;
  };
}

module.exports = CategoryServices;
