//move AI orchestration OUT of Editor

import { useState } from "react";
import { toast } from "sonner";
import { useNotesStore } from "../store/useNotesStore";
import { useChatStore } from "../store/useChatStore";

export function useAI(){
const activeNote = useNotesStore((state) => state.activeNote);
const addToChatHistory = useChatStore((state) => state.addToChatHistory);

const lastPromptAction = useNotesStore(
  (state) => state.lastPromptAction
);

const lastPromptContent = useNotesStore(
  (state) => state.lastPromptContent
);

const setlatestAIResponse = useNotesStore(
  (state) => state.setlatestAIResponse
);

const setLastPromptAction = useNotesStore(
  (state) => state.setLastPromptAction
);

const setPromptContent = useNotesStore(
  (state) => state.setPromptContent
);
  const [isLoading, setLoading] = useState<boolean>(false);
  
async function generateAI(action: string, content: string, re?: boolean, signal?: AbortSignal) {
    setLoading(true);
    if(!re){
    setLastPromptAction(action);
    if (activeNote) setPromptContent(activeNote.content);
    }
    if(!activeNote) throw new Error("Invalid Note");
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
        signal
      });
      const fetchedRes = await response.json();
      setlatestAIResponse(fetchedRes.content);
      addToChatHistory([
        {
        id: crypto.randomUUID(),
        noteId: activeNote.id,
        role: "user",
        content: action
        
      },{
        id: crypto.randomUUID(),
        noteId: activeNote.id ,
        role: "assistant",
        content: fetchedRes.content
      }
      ])
      toast.success("Generated Content", {
        duration: 2000,
      });
    }  finally {
      setLoading(false);
    }
  }

  async function generateTags(id: number, content: string) {
    try {
      const response = await fetch("http://localhost:3000/notes/ai/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }),
      });
      const fetchedRes = await response.json();
      return fetchedRes.tags;
    } catch (error) {
      console.error(error);
      toast.error("Failed generating response", {
        duration: 2000,
      });
    }
  }

  async function retryAI(signal?:AbortSignal){
    await generateAI(
        lastPromptAction,
        lastPromptContent,
        true,
        signal

    );
  }
    return {
        retryAI,
        isLoading,
        generateAI,
        generateTags
    }
}