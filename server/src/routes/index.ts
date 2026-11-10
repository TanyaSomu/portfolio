import { Router } from 'express';
import authRoutes from './authRoutes';
import profileRoutes from './profileRoutes';
import projectsRoutes from './projectsRoutes';
import skillsRoutes from './skillsRoutes';
import experienceRoutes from './experienceRoutes';
import educationRoutes from './educationRoutes';
import certificationsRoutes from './certificationsRoutes';
import blogRoutes from './blogRoutes';
import contactRoutes from './contactRoutes';
import resumeRoutes from './resumeRoutes';
import analyticsRoutes from './analyticsRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/projects', projectsRoutes);
router.use('/skills', skillsRoutes);
router.use('/experience', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/certifications', certificationsRoutes);
router.use('/blog', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/resume', resumeRoutes);
router.use('/analytics', analyticsRoutes);

// System health check
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'PERN Portfolio API',
  });
});

export default router;

