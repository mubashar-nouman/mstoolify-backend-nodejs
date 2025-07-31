import express from 'express';
import {
  addPrompt,
  updatePrompt,
  getAllPrompts,
  deletePrompt,
} from '../controllers/prompts.controller.js';

const router = express.Router();

router.get('/', getAllPrompts);
router.post('/', addPrompt);
router.put('/:id', updatePrompt);
router.delete('/:id', deletePrompt);

export default router;
