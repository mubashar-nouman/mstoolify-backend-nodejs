import { generateContent } from '../utils/llm.js';
import { Prompt } from '../models/prompts.model.js';

const generateWithPrompt = async (req, res, toolSlug, requiredFields = []) => {
  try {
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
    }

    const promptData = await Prompt.findOne({ toolSlug });

    if (!promptData) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    let finalPrompt = promptData.prompt;

    for (const field of requiredFields) {
      finalPrompt = finalPrompt.replace(`{${field}}`, req.body[field]);
    }

    const { content, totalTokens } = await generateContent(finalPrompt);

    console.log(`[${toolSlug}]`, { content, totalTokens });
    res.json({ content });
  } catch (error) {
    console.error(`Error in ${toolSlug}:`, error);
    res.status(500).json({ message: 'Failed to generate content' });
  }
};

// ------------- Tool-specific handlers -------------

export const generateBlogTitle = (req, res) =>
  generateWithPrompt(req, res, 'blog-title-generator', ['topic']);

export const generateBlogContent = (req, res) =>
  generateWithPrompt(req, res, 'blog-content-writer', ['topic', 'keywords', 'outline']);

export const generateBlogIdeas = (req, res) =>
  generateWithPrompt(req, res, 'blog-topic-ideas', ['niche']);

export const rewriteArticle = (req, res) =>
  generateWithPrompt(req, res, 'article-rewriter', ['text']);

export const improveText = (req, res) =>
  generateWithPrompt(req, res, 'text-improver', ['text']);

export const generateYouTubeTitle = (req, res) =>
  generateWithPrompt(req, res, 'youtube-title-generator', ['topic']);

export const generateYouTubeDescription = (req, res) =>
  generateWithPrompt(req, res, 'youtube-description-writer', ['topic', 'keywords']);

export const generateYouTubeTags = (req, res) =>
  generateWithPrompt(req, res, 'youtube-tags-generator', ['topic']);

export const generateInstaCaptions = (req, res) =>
  generateWithPrompt(req, res, 'instagram-caption-generator', ['topic', 'number']);

export const generateLinkedInPost = (req, res) =>
  generateWithPrompt(req, res, 'linkedin-post-writer', ['topic']);

export const generateTwitterThread = (req, res) =>
  generateWithPrompt(req, res, 'twitter-thread-generator', ['topic', 'number']);












// import { generateContent } from '../utils/llm.js';
// import { Prompt } from '../models/prompts.model.js';

// //  @desc Generate content using a prompt
// export const generateInstaCaptions = async (req, res) => {
//     try {
//         const { topic, number } = req.body;

//         if (!topic && !number) {
//             return res.status(400).json({ message: "Topic or number is missing." });
//         }

//         // Fetch prompt from DB based on slug
//         const promptData = await Prompt.findOne({ toolSlug: 'instagram-captions' });

//         if (!promptData) {
//             return res.status(404).json({ message: 'Prompt not found' });
//         }

//         // Replace placeholder in the prompt with actual topic
//         let finalPrompt = promptData.prompt;

//         finalPrompt = finalPrompt.replace("{topic}", topic);
//         finalPrompt = finalPrompt.replace("{number}", number);

//         // Generate content using the LLM
//         const { content, totalTokens } = await generateContent(finalPrompt);

//         console.log('Generated Content:', content);
//         console.log('Tokens Used:', totalTokens);
//         res.json({ content: content });
//     } catch (error) {
//         console.error('Error generating content:', error);
//         res.status(500).json({ message: 'Failed to generate content' });
//     }
// };

