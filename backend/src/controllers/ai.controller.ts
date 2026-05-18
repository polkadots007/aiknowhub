import { getAIResponse } from "../services/ai.service"
import { Request, Response } from "express";

export const applyAI = async (req: Request, res: Response) => {
  try {
    const { action, content } = req.body
    const prompt = `For the following content, do this action : Action : ${action}, Content: ${content}`;
    const data = await getAIResponse(prompt);

    res.status(200).json({
        content: data
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch quote"
    })
  }
}

export const getTags = async (req: Request, res: Response) => {
  try {
    const { content } = req.body
    const prompt = `For the following content, do this action : Action : Generate 3-5 short tags for this note.Return only comma separated tags. Content: ${content}`;
    const data = await getAIResponse(prompt);

    res.status(200).json({
        tags: data
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch quote"
    })
  }
}
