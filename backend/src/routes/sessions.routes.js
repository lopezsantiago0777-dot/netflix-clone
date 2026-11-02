import { Router } from 'express';
import { signIn } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema } from '../validators/auth.validator.js';

const router = Router();

router.post('/', validate(loginSchema), signIn);

export default router;