import { Router } from 'express';
import {
  getMovies, getMovieById, createMovie, updateMovie, deleteMovie,
} from '../controllers/movies.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.use(requireAuth);

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;