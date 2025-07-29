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

const router = express.Router();

router.post('/blog-title', generateBlogTitle);
router.post('/blog-content', generateBlogContent);
router.post('/blog-ideas', generateBlogIdeas);
router.post('/article-rewriter', rewriteArticle);
router.post('/text-improver', improveText);
router.post('/youtube-title', generateYouTubeTitle);
router.post('/youtube-description', generateYouTubeDescription);
router.post('/youtube-tags', generateYouTubeTags);
router.post('/instagram-caption', generateInstaCaptions);
router.post('/linkedin-post', generateLinkedInPost);
router.post('/twitter-thread', generateTwitterThread);

export default router;
