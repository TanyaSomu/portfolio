import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getProfile);
router.put('/', authenticateAdmin, updateProfile);

export default router;

