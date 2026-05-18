import { useEffect, useState } from "react";
import { useNotesStore } from "../store/useNotesStore";

type TagsPanelProps = {
  noteId: number;
  tags: string[];
};

const TagsPanel = ({ noteId, tags }: TagsPanelProps) => {
  const [tagsInput, setTagsInput] = useState<string>(tags.join(", "));
  const { setTags } = useNotesStore();

  function onEditTags(event: React.ChangeEvent<HTMLInputElement>) {
    setTagsInput(event.target.value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTags: string[] = tagsInput
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      if (noteId) {
        setTags(noteId, [...new Set(newTags)]);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [tagsInput]);

  return (
    <div className="w-[20dvw] px-3 py-1">
      <div className="flex items-center gap-2">
        <h2 className="border-b py-5 dark:!text-white">Tags</h2>
      </div>
      <input
        className="w-full h-20 overflow-y-auto border-gray-500 border-2 p-4 my-4 text-black dark:text-white"
        id="note-area"
        name="note-area"
        value={tagsInput}
        placeholder="Enter your tags here e.g. tag1, tag2, tag3, "
        onChange={onEditTags}
      />
    </div>
  );
};

export default TagsPanel;
