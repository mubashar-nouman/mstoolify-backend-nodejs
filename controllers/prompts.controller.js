import { Prompt } from '../models/prompts.model.js';

// @desc Add new prompt
export const addPrompt = async (req, res) => {
  try {
    const { toolSlug, name, prompt } = req.body;
    const newPrompt = new Prompt({ toolSlug, name, prompt });
    await newPrompt.save();
    res.status(201).json(newPrompt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a prompt by ID
export const updatePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const { prompt } = req.body;

    const updated = await Prompt.findByIdAndUpdate(
      id,
      { prompt },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all prompts
export const getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find();
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a prompt by ID
export const deletePrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Prompt.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    res.json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
