//move AI orchestration OUT of Editor

import { useState } from "react";
import { toast } from "sonner";
import { useNotesStore } from "../store/useNotesStore";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

export function useAI(){
const activeNote = useNotesStore((state) => state.activeNote);
const addToChatHistory = useChatStore((state) => state.addToChatHistory);
const { session } = useAuthStore();

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
    if(!session) throw new Error("Invalid Session")
    const token = session?.access_token;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/ai`, {
        method: "POST",
          headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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
        note_id: activeNote.id,
        role: "user",
        content: action
        
      },{
        note_id: activeNote.id ,
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

  async function generateTags(content: string) {
    if(!content.length) {
      toast.warning("No content found. Start writing!", {
        duration: 2000
      })
      return;
    }

    if(!session) throw new Error("Invalid Session")
    const token = session?.access_token;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}notes/ai/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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