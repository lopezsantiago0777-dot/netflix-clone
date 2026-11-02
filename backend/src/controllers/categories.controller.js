import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    const status = error.name === 'ValidationError' || error.code === 11000 ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.status(200).json(category);
  } catch (error) {
    const status = error.name === 'CastError' || error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.status(200).json({ message: 'Categoría eliminada' });
  } catch (error) {
    const status = error.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};