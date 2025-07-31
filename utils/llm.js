import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // ensure your GROQ_API_KEY is in .env
});

/**
 * Generates content using Groq LLM
 * @param {string} prompt - The prompt string with user input integrated.
 * @param {string} model - The Groq model name to use.
 * @param {number} temperature - Randomness of output (default 1).
 * @returns {Promise<string>} - The generated content as a string.
 */
export const generateContent = async (prompt, model = 'meta-llama/llama-4-scout-17b-16e-instruct', temperature = 1) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false, // set to true if you handle streaming on client
    });

    const content = chatCompletion.choices[0].message.content.trim();
    const totalTokens = chatCompletion.usage?.total_tokens || 0;
    return { content, totalTokens };
  } catch (error) {
    console.error('Groq LLM Error:', error);
    throw new Error('Failed to generate content from LLM');
  }
};
