import { useCallback, useEffect, useState } from "react";
import { useNotesStore } from "../store/useNotesStore";
import { toast } from "sonner";
import AIResponsePanel from "./AIResponsePanel";
import { useAI } from "../hooks/useAI";
import TagsPanel from "./TagsPanel";
import type { NotesState } from "../types";

const Editor = () => {
  const updateNote = useNotesStore((state: NotesState) => state.updateNote);
  const activeNote = useNotesStore((state: NotesState) => state.activeNote);
  const aiContent = useNotesStore((state: NotesState) => state.aiContent);
  const searchTerm = useNotesStore((state) => state.searchTerm);
  const setSearchTerm = useNotesStore((state) => state.setSearchTerm);

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
      console.error(error);
      toast.error("Failed to copy", {
        duration: 2000,
      });
    }
  }

  async function saveSelection(action: string, signal?: AbortSignal) {
    const selected = action.toLocaleLowerCase();
    if (selected === "replace") {
      setContent(aiContent);
    } else if (selected === "append") {
      setContent((prev: string) => prev + "\n" + aiContent);
    } else if (selected === "copy") {
      handleCopy(aiContent);
    } else if (selected === "retry") {
      await retryAI(signal);
    } else {
      //pass
    }
  }

  function syncDraft(content: string, title: string) {
    console.log("null check", content, title);
    if (activeNote?.id && isDirty) {
      updateNote({
        ...activeNote,
        title: title,
        content: content,
        updatedAt: Date.now(),
      });
      setIsDirty(false);
    }
  }

  function closeEditor() {
    setActiveNote(null);
  }
  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "s") {
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
      <AIResponsePanel
        content={activeNote?.content || ""}
        saveSelection={saveSelection}
      />
    </div>
  );
};

export default Editor;
