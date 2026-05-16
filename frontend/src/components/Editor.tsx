import { useEffect, useState } from "react";
import { useNotesStore } from "../store/useNotesStore";
import { toast } from "sonner";
import { Spinner } from "./Reusable/Spinner";
import AIResponsePanel from "./AIResponsePanel";
import { useAI } from "../hooks/useAI";

const Editor = () => {
  const { updateNote, activeNote, aiContent, setActiveNote } = useNotesStore();
  const { isLoading, retryAI, generateTags } = useAI();
  const [title, setTitle] = useState<string>(activeNote?.title ?? "");
  const [content, setContent] = useState<string>(activeNote?.content ?? "");

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }
  function onContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
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

  async function saveSelection(action: string) {
    const selected = action.toLocaleLowerCase();
    if (selected === "replace") {
      setContent(aiContent);
    } else if (selected === "append") {
      setContent((prev: string) => prev + "\n" + aiContent);
    } else if (selected === "copy") {
      handleCopy(aiContent);
    } else if (selected === "retry") {
      await retryAI();
    } else {
      //pass
    }
  }

  function syncDraft(content: string, title: string, tags: string) {
    if (activeNote?.id) {
      updateNote({
        id: activeNote.id,
        title: title,
        content: content,
        createdAt: activeNote.createdAt,
        updatedAt: Date.now(),
        tags: tags.split(","),
      });
    }
  }

  function closeEditor() {
    setActiveNote(null);
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (activeNote) {
        const tags = await generateTags(activeNote?.id, content);
        syncDraft(content, title, tags);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [title, content, activeNote?.id]);

  useEffect(() => {
    setTitle(activeNote?.title ?? "");
    setContent(activeNote?.content ?? "");
  }, [activeNote?.id]);

  useEffect(() => {
    async function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();

        if (activeNote) {
          const tags = await generateTags(activeNote?.id, content);
          syncDraft(content, title, tags);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-row gap-2 justify-center items-start">
      <div className="w-[70dvw]">
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
      {aiContent.length > 0 && (
        <AIResponsePanel content={aiContent} saveSelection={saveSelection} />
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Editor;
