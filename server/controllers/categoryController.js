const CategoryServices = require('../services/Category.services');

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoryServices.getAllCategory();
    res.status(200).json({ message: 'success', categories });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.getCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryServices.getCategoryId(id);
    res.status(200).json({ message: 'success', category });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await CategoryServices.createCategory({ name });
    res.status(201).json({ message: 'success', category });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.putCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await CategoryServices.getCategoryId(id);
    if (!category) {
      res.status(400).json({ message: 'Такой категории нет' });
    }

    await CategoryServices.updateCategory(id, { name });
    res.status(200).json({ message: 'success', category });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryServices.getCategoryId(id);
    if (!category) {
      res.status(400).json({ message: 'Такой категории нет' });
    }

    await CategoryServices.deleteCategory(id);
    res.status(200).json({ message: 'success' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};
