import { Router } from 'express';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getExperiences);
router.post('/', authenticateAdmin, createExperience);
router.put('/:id', authenticateAdmin, updateExperience);
router.delete('/:id', authenticateAdmin, deleteExperience);

export default router;

