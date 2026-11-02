import { Router } from 'express';
import {
  getCategories, createCategory, updateCategory, deleteCategory,
} from '../controllers/categories.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;