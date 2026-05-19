import { useChatStore } from "../store/useChatStore";
import type { ChatMessage } from "../types";

export function useChatForNote(noteId: number): ChatMessage[] {
  return useChatStore((state) =>
    state.chatHistory.filter(
      (msg) => msg.noteId === noteId
    )
  );
}