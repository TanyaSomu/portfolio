import { Router } from 'express';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../controllers/certificationsController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getCertifications);
router.post('/', authenticateAdmin, createCertification);
router.put('/:id', authenticateAdmin, updateCertification);
router.delete('/:id', authenticateAdmin, deleteCertification);

export default router;

