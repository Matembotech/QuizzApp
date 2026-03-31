import { Router } from 'express';
import { register, login } from '../controllers/AuthController';

const router = Router();

/**
 * POST /api/register
 * Register a new user
 */
router.post('/register', register);

/**
 * POST /api/login
 * Login user
 */
router.post('/login', login);

export default router;
