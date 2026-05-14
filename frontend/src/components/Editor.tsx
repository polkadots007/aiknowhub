import { useEffect, useState } from "react";
import { useNotesStore } from "../store/useNotesStore";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { ActionDropdown } from "./Reusable/Dropdown";
import { Spinner } from "./Reusable/Spinner";

const Editor = () => {
  const {
    updateNote,
    activeNote,
    aiContent,
    lastPromptAction,
    setAIContent,
    setActiveNote,
    lastPromptContent,
  } = useNotesStore();
  const [isLoading, setLoading] = useState<boolean>(false);
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

  async function retryAction() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/notes/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: lastPromptAction,
          content: lastPromptContent,
        }),
      });
      const fetchedRes = await response.json();
      console.log("fetched", fetchedRes.content);
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
  function saveSelection(action: string) {
    const selected = action.toLocaleLowerCase();
    if (selected === "replace") {
      setContent(aiContent);
    } else if (selected === "append") {
      setContent((prev: string) => prev + "\n" + aiContent);
    } else if (selected === "copy") {
      handleCopy(aiContent);
    } else if (selected === "retry") {
      retryAction();
    } else {
      //pass
    }
  }

  function updateNotes(content: string, title: string) {
    if (activeNote?.id) {
      updateNote({
        id: activeNote.id,
        title: title,
        content: content,
      });
    }
  }

  function closeEditor() {
    setActiveNote(null);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeNote) updateNotes(content, activeNote.title);
    }, 300);
    return () => clearTimeout(timer);
  }, [content]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeNote) updateNotes(activeNote.content, title);
    }, 300);
    return () => clearTimeout(timer);
  }, [title]);

  useEffect(() => {
    setTitle(activeNote?.title ?? "");
    setContent(activeNote?.content ?? "");
  }, [activeNote?.id]);

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
        <div className="w-[25dvw] border-1 border-blue-600 px-3 py-1">
          <div className="flex items-center gap-2">
            <h2 className="border-b py-5">AI Generated Response</h2>
            <div className="ml-auto">
              <ActionDropdown
                values={[
                  { key: "replace", val: "Replace Note" },
                  { key: "append", val: "Append" },
                  { key: "copy", val: "Copy" },
                  { key: "retry", val: "Retry" },
                ]}
                onSelect={saveSelection}
              />
            </div>
          </div>
          <div className="w-full h-[75dvh] border-gray-500 border-2 p-4 my-4 break-words overflow-y-auto">
            <ReactMarkdown>{aiContent}</ReactMarkdown>
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Editor;
