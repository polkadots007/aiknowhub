import Editor from "../components/Editor";
import Header from "../components/Header";
import ViewNotes from "../components/View";
import { useNotesStore } from "../store/useNotesStore";

const Notes = () => {
  const activeNote = useNotesStore((state) => state.activeNote);
  return (
    <>
      <Header />
      {activeNote && activeNote.id ? <Editor /> : <ViewNotes />}
    </>
  );
};

export default Notes;
