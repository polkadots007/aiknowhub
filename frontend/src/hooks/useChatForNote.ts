import { useMemo } from "react";
import { useChatStore } from "../store/useChatStore";

export function useChatForNote(noteId: number) {
  const chatHistory = useChatStore(
    (state) => state.chatHistory
  );

  return useMemo(() => {
    return chatHistory.filter(
      (msg) => msg.noteId === noteId
    );
  }, [chatHistory, noteId]);
}