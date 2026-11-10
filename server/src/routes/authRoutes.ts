import { Router } from 'express';
import { login, logout, getCurrentUser } from '../controllers/authController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateAdmin, getCurrentUser);

export default router;

