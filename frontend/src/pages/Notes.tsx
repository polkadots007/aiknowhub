import { useEffect } from "react";
import Editor from "../components/Editor";
import Header from "../components/Header";
import ViewNotes from "../components/View";
import { useNotesStore } from "../store/useNotesStore";
import { useChatStore } from "../store/useChatStore";

const Notes = () => {
  const loadNotes = useNotesStore((state) => state.loadNotes);
  const loadChats = useChatStore((state) => state.loadChats);
  const activeNote = useNotesStore((state) => state.activeNote);

  useEffect(() => {
    loadNotes();
    loadChats();
  }, []);
  return (
    <div className="dark:bg-[#16171d]">
      <Header />
      {activeNote && activeNote.id ? (
        <Editor key={activeNote.id} />
      ) : (
        <ViewNotes />
      )}
    </div>
  );
};

export default Notes;
