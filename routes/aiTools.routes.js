import express from 'express';
import {
  generateBlogTitle,
  generateBlogContent,
  generateBlogIdeas,
  rewriteArticle,
  improveText,
  generateYouTubeTitle,
  generateYouTubeDescription,
  generateYouTubeTags,
  generateInstaCaptions,
  generateLinkedInPost,
  generateTwitterThread
} from '../controllers/aiTools.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/blog-title', protect, generateBlogTitle);
router.post('/blog-content', protect, generateBlogContent);
router.post('/blog-ideas', protect, generateBlogIdeas);
router.post('/article-rewriter', protect, rewriteArticle);
router.post('/text-improver', protect, improveText);
router.post('/youtube-title', protect, generateYouTubeTitle);
router.post('/youtube-description', protect, generateYouTubeDescription);
router.post('/youtube-tags', protect, generateYouTubeTags);
router.post('/instagram-caption', protect, generateInstaCaptions);
router.post('/linkedin-post', protect, generateLinkedInPost);
router.post('/twitter-thread', protect, generateTwitterThread);

export default router;
