import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Logo } from "./Reusable/Icons";
import { BoltIcon } from "@heroicons/react/24/outline";
import { useNotesStore } from "../store/useNotesStore";
import type { NotesState } from "../types";
import { useState } from "react";
import { AIModal, ConfirmationModal } from "./Reusable/Modal";
import SearchBar from "./Search";
import { Spinner } from "./Reusable/Spinner";
import { toast } from "sonner";
import { Toggle } from "./Reusable/Toggle";

const Header = () => {
  const addNote = useNotesStore((state: NotesState) => state.addNote);
  const deleteNote = useNotesStore((state: NotesState) => state.deleteNote);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAIModal, setOpenAIModal] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const activeNote = useNotesStore((state: NotesState) => state.activeNote);
  const setAIContent = useNotesStore((state: NotesState) => state.setAIContent);
  const setAIAction = useNotesStore((state: NotesState) => state.setAIAction);

  function onConfirm() {
    if (activeNote) deleteNote(activeNote?.id);
    setOpenModal(false);
  }
  function onCancel() {
    setOpenModal(false);
  }
  async function onConfirmAIModal(action: string) {
    setLoading(true);
    setAIAction(action);
    try {
      const response = await fetch("http://localhost:3000/notes/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: action,
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
      toast.error("Failed to generat content", {
        duration: 2000,
      });
    } finally {
      setLoading(false);
      setOpenAIModal(false);
    }
  }
  function onCancelAIModal() {
    setOpenAIModal(false);
  }
  return (
    <div>
      <div>
        <div className="bg-gray-950 border-b border-slate-800 text-white p-4">
          <div className="flex justify-between">
            {/* Left */}
            <Logo />
            {/* Middle */}
            <SearchBar />
            {/* Right */}
            <div className="flex items-center gap-4">
              <button
                className="group flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-800"
                onClick={addNote}
              >
                <PlusIcon className="w-6 h-6 text-blue-500 group-hover:stroke-white" />
                New Note
              </button>
              {activeNote && (
                <>
                  <button
                    className="group flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-800"
                    onClick={() => setOpenAIModal(true)}
                  >
                    <BoltIcon className="w-6 h-6 text-blue-500 group-hover:stroke-white" />
                    AI
                  </button>
                  <button
                    className="group flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-800"
                    onClick={() => setOpenModal(true)}
                  >
                    <TrashIcon className="w-6 h-6 text-blue-500 group-hover:stroke-white" />
                    Delete
                  </button>
                </>
              )}
              <Toggle />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          open={openModal}
          onConfirm={onConfirm}
          onCancel={onCancel}
          title={activeNote?.title || "Note"}
        />
      )}
      {openAIModal && (
        <AIModal
          open={openAIModal}
          onConfirm={onConfirmAIModal}
          onClose={onCancelAIModal}
        />
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Header;
