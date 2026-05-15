//move AI orchestration OUT of Editor

import { useState } from "react";
import { toast } from "sonner";
import { useNotesStore } from "../../store/useNotesStore";

export function useAI(){
    const {
        activeNote,
        lastPromptAction,
        setAIContent,
        lastPromptContent,
        setLastPromptAction,
        setPromptContent
      } = useNotesStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  
async function generateAI(action: string, content: string, re?: boolean) {
    setLoading(true);
    if(!re){
    setLastPromptAction(action);
    if (activeNote) setPromptContent(activeNote.content);
    }
    try {
      const response = await fetch("http://localhost:3000/notes/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: action,
          content: content,
        }),
      });
      const fetchedRes = await response.json();
      setAIContent(fetchedRes.content);
      toast.success("Generated Content", {
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed generating response", {
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  }

  async function retryAI(){
    await generateAI(
        lastPromptAction,
        lastPromptContent,
        true
    );
  }
    return {
        retryAI,
        isLoading,
        generateAI
    }
}