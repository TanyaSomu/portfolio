import { Router } from 'express';
import {
  getActiveResume,
  downloadResume,
  previewResume,
  uploadNewResume,
  listAllResumes,
} from '../controllers/resumeController';
import { authenticateAdmin } from '../middleware/auth';
import { uploadResume } from '../middleware/upload';

const router = Router();

// Public routes
router.get('/', getActiveResume);
router.get('/download', downloadResume);
router.get('/preview', previewResume);

// Admin routes
router.get('/all', authenticateAdmin, listAllResumes);
router.post('/', authenticateAdmin, uploadResume.single('resume'), uploadNewResume);

export default router;

