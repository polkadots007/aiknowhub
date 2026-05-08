import {
  Cog6ToothIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "./Reusable/Icons";
import { BoltIcon } from "@heroicons/react/24/outline";
import { useNotesStore } from "../store/useNotesStore";
import type { NotesState } from "../types";
import { useState } from "react";
import { AIModal, ConfirmationModal } from "./Reusable/Modal";
import SearchBar from "./Search";

const Header = () => {
  const addNote = useNotesStore((state: NotesState) => state.addNote);
  const deleteNote = useNotesStore((state: NotesState) => state.deleteNote);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAIModal, setOpenAIModal] = useState<boolean>(false);
  const activeNote = useNotesStore((state: NotesState) => state.activeNote);

  function onConfirm() {
    if (activeNote) deleteNote(activeNote?.id);
    setOpenModal(false);
  }
  function onCancel() {
    setOpenModal(false);
  }
  function onConfirmAIModal(response: string) {
    console.log("response", response);
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
              <button className="flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer">
                <Cog6ToothIcon className="w-6 h-6 text-blue-500" />
                Settings
              </button>
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
          onCancel={onCancelAIModal}
          content={activeNote?.content || ""}
        />
      )}
    </div>
  );
};

export default Header;
