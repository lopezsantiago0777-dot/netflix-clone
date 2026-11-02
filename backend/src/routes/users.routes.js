import { Router } from 'express';
import { signUp, getMe } from '../controllers/auth.controller.js';
import { getMyList, addToMyList, removeFromMyList } from '../controllers/mylist.controller.js';
import { validate } from '../middlewares/validate.js';
import { requireAuth } from '../middlewares/auth.js';
import { registerSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/', validate(registerSchema), signUp);
router.get('/me', requireAuth, getMe);
router.get('/mylist', requireAuth, getMyList);
router.put('/mylist/:movieId', requireAuth, addToMyList);
router.delete('/mylist/:movieId', requireAuth, removeFromMyList);

export default router;