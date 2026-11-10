import { Router } from 'express';
import {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
} from '../controllers/contactController';
import { authenticateAdmin } from '../middleware/auth';
import { contactRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public submission with rate limiting
router.post('/', contactRateLimiter, submitContactMessage);

// Admin message management
router.get('/', authenticateAdmin, getContactMessages);
router.put('/:id', authenticateAdmin, updateMessageStatus);
router.delete('/:id', authenticateAdmin, deleteContactMessage);

export default router;

