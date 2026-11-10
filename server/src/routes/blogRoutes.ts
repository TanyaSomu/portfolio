import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController';
import { authenticateAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);

router.post('/', authenticateAdmin, createBlogPost);
router.put('/:id', authenticateAdmin, updateBlogPost);
router.delete('/:id', authenticateAdmin, deleteBlogPost);

export default router;

