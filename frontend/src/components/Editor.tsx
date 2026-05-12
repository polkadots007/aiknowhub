import { useState } from "react";
import { useNotesStore } from "../store/useNotesStore";
import type { Note, NotesState } from "../types";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { AIActionDropdown } from "./Reusable/Dropdown";
import { Spinner } from "./Reusable/Spinner";

const Editor = () => {
  const updateNote = useNotesStore((state) => state.updateNote);
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const activeNote = useNotesStore((state) => state.activeNote);
  const setActiveNote = useNotesStore((state) => state.setActiveNote);
  const aiContent = useNotesStore((state) => state.aiContent);
  const aiAction = useNotesStore((state) => state.aiAction);
  const setAIContent = useNotesStore((state: NotesState) => state.setAIContent);
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
          action: aiAction,
          content: activeNote?.content,
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

  function updateNotes() {
    if (activeNote?.id) {
      updateNote({
        id: activeNote.id,
        title: title,
        content: content,
      });
      setActiveNote(null);
    }
  }
  function cancelNote(activeNote: Note | null) {
    if (activeNote?.id) {
      if (activeNote?.title === "Untitled" && activeNote?.content === "")
        deleteNote(activeNote?.id);
      else setActiveNote(null);
    }
    setAIContent("");
  }

  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <div className="w-[70dvw]">
        <div className="flex justify-between pt-2">
          <div className="font-semibold text-2xl text-blue-500 text-left">
            <input value={title} onChange={onTitleChange} />
          </div>
          <div className="flex gap-2">
            <button
              className="flex gap-1 items-center border-1 border-blue-600 px-3 py-1 rounded text-sm cursor-pointer text-white hover:bg-blue-600"
              onClick={() => cancelNote(activeNote)}
            >
              Cancel
            </button>
            <button
              className="flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer text-white hover:bg-blue-800"
              onClick={() => updateNotes()}
            >
              Save Changes
            </button>
          </div>
        </div>
        <textarea
          className="w-full h-[80dvh] border-gray-500 border-2 p-4 my-4"
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
              <AIActionDropdown
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
