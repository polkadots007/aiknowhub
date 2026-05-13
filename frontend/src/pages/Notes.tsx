import Editor from "../components/Editor";
import Header from "../components/Header";
import ViewNotes from "../components/View";
import { useNotesStore } from "../store/useNotesStore";

const Notes = () => {
  const activeNote = useNotesStore((state) => state.activeNote);
  return (
    <div className="dark:bg-[#16171d]">
      <Header />
      {activeNote && activeNote.id ? <Editor /> : <ViewNotes />}
    </div>
  );
};

export default Notes;
