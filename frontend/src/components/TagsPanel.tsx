import { useEffect, useState } from "react";
import { useNotesStore } from "../store/useNotesStore";
import { useAI } from "../hooks/useAI";

type TagsPanelProps = {
  noteId: number;
  content: string;
  tags: string[];
};

const TagsPanel = ({ noteId, content, tags }: TagsPanelProps) => {
  const [tagsInput, setTagsInput] = useState<string>(tags.join(", "));
  const setTags = useNotesStore((state) => state.setTags);
  const { generateTags } = useAI();
  function onEditTags(event: React.ChangeEvent<HTMLInputElement>) {
    setTagsInput(event.target.value);
  }
  async function generateAITags() {
    const tags = await generateTags(noteId, content);
    setTagsInput(tags.toLowerCase());
    console.log("rs", tags, content);
    const newTags: string[] = tags
      .split(",")
      .map((t: string) => t.trim().toLowerCase())
      .filter(Boolean);
    setTags(noteId, [...new Set(newTags)]);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTags: string[] = tagsInput
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      if (noteId !== -1) {
        const existingTags = tags.join(", ");
        if (tagsInput !== existingTags) setTags(noteId, [...new Set(newTags)]);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [tagsInput, noteId, tags, setTags]);

  useEffect(() => {
    setTagsInput(tags.join(", "));
  }, [noteId]);
  return (
    <div className="w-[20dvw] px-3 py-1">
      <div className="flex justify-between items-center gap-2">
        <h2 className="border-b py-5 dark:!text-white">Tags</h2>
        <button
          className="flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer text-white hover:bg-blue-800"
          onClick={() => generateAITags()}
        >
          ✨ Generate Tags
        </button>
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
