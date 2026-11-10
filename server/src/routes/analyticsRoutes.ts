import { Router } from 'express';
import {
  trackEvent,
  getAnalyticsOverview,
} from '../controllers/analyticsController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

// Public event tracking
router.post('/track', trackEvent);

// Admin dashboard analytics
router.get('/overview', authenticateAdmin, getAnalyticsOverview);

export default router;

