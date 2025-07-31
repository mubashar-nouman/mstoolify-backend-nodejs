import { generateContent } from '../utils/llm.js';
import { Prompt } from '../models/prompts.model.js';
import { User } from '../models/user.model.js';

const generateWithPrompt = async (req, res, toolSlug, requiredFields = []) => {
    try {
        const missingFields = requiredFields.filter(field => !req.body[field]);
        const user = await User.findById(req.user.id);
        console.log(`User ID: ${user.id}`);
        console.log(`Token Limit: ${user.tokensLimit}`);
        console.log(`Tokens Used: ${user.tokensUsed}`);
        console.log(`User: ${user.email}`);

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
        }

        // Load prompt
        const promptData = await Prompt.findOne({ toolSlug });
        if (!promptData) {
            return res.status(404).json({ message: 'Prompt not found' });
        }

        // Prepare prompt
        let finalPrompt = promptData.prompt;
        for (const field of requiredFields) {
            finalPrompt = finalPrompt.replace(`{${field}}`, req.body[field]);
        }

        // Generate AI Response
        const { content, totalTokens } = await generateContent(finalPrompt);

        // Check token limits
        const remainingTokens = user.tokensLimit - user.tokensUsed;
        if (totalTokens > remainingTokens) {
            return res.status(403).json({
                message: `Token limit exceeded. You have ${remainingTokens} tokens remaining.`,
            });
        }

        // Update user's tokensUsed if limit has not been exceeded
        user.tokensUsed += totalTokens;
        await user.save();

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
    generateWithPrompt(req, res, 'blog-content-writer', ['topic', 'keywords', 'tone']);

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

