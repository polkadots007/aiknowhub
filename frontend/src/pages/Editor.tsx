import { useCallback, useEffect, useState } from "react";
import { useNotesStore } from "../store/useNotesStore";
import { toast } from "sonner";
import AIResponsePanel from "../pages/AIResponsePanel";
import { useAI } from "../hooks/useAI";
import TagsPanel from "./TagsPanel";
import type { ChatState, NotesState } from "../types";
import { useChatStore } from "../store/useChatStore";
import { useChatForNote } from "../hooks/useChatForNote";

const Editor = () => {
  const updateNote = useNotesStore((state: NotesState) => state.updateNote);
  const activeNote = useNotesStore((state: NotesState) => state.activeNote);
  const messages = useChatForNote(activeNote?.id || -1);

  const searchTerm = useNotesStore((state) => state.searchTerm);
  const setSearchTerm = useNotesStore((state) => state.setSearchTerm);
  const clearChatForNote = useChatStore(
    (state: ChatState) => state.clearChatForNote,
  );

  const setActiveNote = useNotesStore(
    (state: NotesState) => state.setActiveNote,
  );
  const { retryAI } = useAI();
  const [title, setTitle] = useState<string>(activeNote?.title ?? "");
  const [content, setContent] = useState<string>(activeNote?.content ?? "");
  const [isDirty, setIsDirty] = useState<boolean>(false);

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setIsDirty(true);
  }
  function onContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    setIsDirty(true);
  }
  async function handleCopy(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard", {
        duration: 2000,
      });
    } catch (error) {
      try {
        const textarea = document.createElement("textarea");

        textarea.value = content;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const successful = document.execCommand("copy");

        document.body.removeChild(textarea);

        if (!successful) {
          throw new Error("Fallback copy failed", {
            cause: error,
          });
        }

        toast.success("Copied to clipboard", {
          duration: 2000,
        });
      } catch (fallbackError) {
        console.error(fallbackError);

        toast.error("Failed to copy", {
          duration: 2000,
        });
      }
    }
  }

  async function saveSelection(action: string, signal?: AbortSignal) {
    if (!activeNote) return;
    const selected = action.toLowerCase();
    const latestAIResponse =
      messages
        .filter((m) => m.role === "assistant" && m.note_id === activeNote.id)
        .at(-1)?.content ?? "";
    if (selected === "replace") {
      setContent(latestAIResponse);
    } else if (selected === "append") {
      setContent((prev: string) => prev + "\n" + latestAIResponse);
    } else if (selected === "copy") {
      await handleCopy(latestAIResponse);
    } else if (selected === "retry") {
      await retryAI(signal);
    } else if (selected === "clear") {
      if (activeNote) clearChatForNote(activeNote.id);
    } else {
      //pass
    }
  }

  function syncDraft(content: string, title: string) {
    if (activeNote?.id && isDirty) {
      updateNote({
        ...activeNote,
        title: title,
        content: content,
        updated_at: new Date().toISOString(),
      });
      setIsDirty(false);
    }
  }

  function closeEditor() {
    if (isDirty) {
      syncDraft(content, title);
    }

    setActiveNote(null);
  }
  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      const isModifier = event.ctrlKey || event.metaKey;
      if (isModifier && event.key.toLowerCase() === "s") {
        event.preventDefault();

        if (activeNote && isDirty) {
          syncDraft(content, title);
        }
      }
    },
    [activeNote, content, title, isDirty],
  );
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (activeNote && isDirty) {
        syncDraft(content, title);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [content, title, activeNote?.id]);
  useEffect(() => {
    if (searchTerm) setSearchTerm("");
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-row gap-2 justify-center items-start">
      <TagsPanel
        key={activeNote?.id}
        noteId={activeNote?.id ?? -1}
        content={activeNote?.content || ""}
        tags={activeNote?.tags || []}
      />
      <div className="w-[60dvw]">
        <div className="flex pt-2">
          <div className="flex-1 mr-2 font-semibold text-2xl text-blue-500 text-left">
            <input value={title} onChange={onTitleChange} className="w-full" />
          </div>
          <div className="flex gap-2">
            <button
              className="flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer text-white hover:bg-blue-800"
              onClick={() => closeEditor()}
            >
              Close
            </button>
          </div>
        </div>
        <textarea
          className="w-full h-[80dvh] overflow-y-auto border-gray-500 border-2 p-4 my-4 text-black dark:text-white"
          id="note-area"
          name="note-area"
          rows={4}
          cols={50}
          value={content}
          placeholder="Enter your notes here"
          onChange={onContentChange}
        />
      </div>
      {activeNote && (
        <AIResponsePanel
          noteId={activeNote.id}
          content={activeNote.content}
          saveSelection={saveSelection}
        />
      )}
    </div>
  );
};

export default Editor;
