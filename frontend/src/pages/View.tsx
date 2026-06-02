import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useNotesStore } from "../store/useNotesStore";
import type { Note } from "../types";
import { useEffect, useMemo, useState } from "react";
import { NoteSkeleton } from "../helper/Modular";
import { useDebounce } from "../hooks/useDebounce";
type SearchType = "title" | "content" | "tags";

const ViewNotes = () => {
  const notes = useNotesStore((state) => state.notes);
  const loading = useNotesStore((state) => state.loading);
  const setActiveNote = useNotesStore((state) => state.setActiveNote);
  const updateTitle = useNotesStore((state) => state.updateTitle);
  const searchTerm = useNotesStore((state) => state.searchTerm);
  const searchType: SearchType = useNotesStore((state) => state.searchType);
  const [title, setTitle] = useState<string>("");
  const [isEditingId, setIsEditingId] = useState<number>(-1);
  const debouncedSearch = useDebounce(searchTerm, 100);

  function updateNoteTitle(isEditingId: number, title: string) {
    if (isEditingId !== -1) {
      updateTitle(isEditingId, title);
    }
  }
  function onEditTitle(_event: React.MouseEvent<HTMLDivElement>, note: Note) {
    // event.stopPropagation();
    setIsEditingId(note.id);
    setTitle(note.title);
  }

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value);
  }
  function finishEditing(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      updateNoteTitle(isEditingId, title);
      setIsEditingId(-1);
      setTitle("");
    } else if (event.key === "Escape") {
      setIsEditingId(-1);
      setTitle("");
    }
  }

  function onBlurEdits() {
    updateNoteTitle(isEditingId, title);
    setIsEditingId(-1);
    setTitle("");
  }

  function focusNote(note: Note) {
    setActiveNote(note);
  }
  const filteredNotes = useMemo(() => {
    if (!debouncedSearch) return notes;
    if (debouncedSearch && debouncedSearch.length) {
      if (searchType !== "tags") {
        return notes.filter((note) =>
          note[searchType]
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()),
        );
      } else
        return notes.filter((note) =>
          note[searchType]
            ?.join(", ")
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()),
        );
    }
    return notes;
  }, [notes, debouncedSearch, searchType]);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="font-semibold text-4xl text-blue-500 text-left p-4 uppercase self-center">
        Notes
      </div>
      <div className="flext-start p-2 border border-slate-800 w-2/3 h-[80dvh] py-10 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] grid-rows-[repeat(auto-fit,minmax(140px,1fr))] gap-2">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => <NoteSkeleton key={i} />)}
        {filteredNotes.map((note: Note) => (
          <div
            key={note?.id}
            className="flex flex-col gap-2 h-fit p-4 items-center justify-start cursor-pointer hover:border hover:border-slate-800"
          >
            <DocumentTextIcon
              className="w-8 h-8 text-blue-500"
              onClick={() => focusNote(note)}
            />
            {isEditingId !== note.id ? (
              <div
                className="text-blue-600 dark:text-white text-center line-clamp-2"
                onDoubleClick={(event: React.MouseEvent<HTMLDivElement>) =>
                  onEditTitle(event, note)
                }
              >
                {note.title}
              </div>
            ) : (
              <input
                autoFocus={true}
                className="text-white bg-transparent text-center w-full outline-none"
                value={title}
                onChange={onTitleChange}
                onKeyDown={finishEditing}
                onBlur={onBlurEdits}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewNotes;
