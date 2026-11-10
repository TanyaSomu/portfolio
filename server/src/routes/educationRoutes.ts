import { Router } from 'express';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../controllers/educationController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getEducation);
router.post('/', authenticateAdmin, createEducation);
router.put('/:id', authenticateAdmin, updateEducation);
router.delete('/:id', authenticateAdmin, deleteEducation);

export default router;

