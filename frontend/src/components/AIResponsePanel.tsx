import ReactMarkdown from "react-markdown";
import { ActionDropdown } from "./Reusable/Dropdown";
import { useMemo, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useAI } from "../hooks/useAI";
import { toast } from "sonner";
import type { NotesState } from "../types";
import { useNotesStore } from "../store/useNotesStore";
import geminiLogo from "../../src/assets/gemini.svg";

type AIPanelProps = {
  content: string;
  saveSelection: (action: string) => void;
};

const AIResponsePanel = ({ content, saveSelection }: AIPanelProps) => {
  const aiContent = useNotesStore((state: NotesState) => state.aiContent);
  const [prompt, setPrompt] = useState<string>("");
  const geminiResponse = useMemo(() => aiContent, [aiContent]);
  const { generateAI } = useAI();
  function onPromptChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(event.target.value);
  }
  async function askAI(prompt: string, content: string) {
    try {
      await generateAI(prompt, content);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate content", {
        duration: 2000,
      });
    }
  }
  return (
    <div className="w-[25dvw] border-1 border-blue-600 px-3 py-1">
      <div className="flex items-center gap-2">
        <div className="border-b flex gap-2 flex-1">
          <img src={geminiLogo} alt="Gemini Logo" width="50" height="50" />
          <h2 className="py-5 dark:!text-white">Gemini</h2>
        </div>
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
      <div className="w-full h-[66dvh] text-black dark:text-white border-gray-500 border-2 p-4 my-4 break-words overflow-y-auto">
        <ReactMarkdown>{geminiResponse}</ReactMarkdown>
      </div>
      <div className="relative w-full">
        <textarea
          className="
      w-full
      min-h-[80px]
      resize-none
      rounded-2xl
      border
      border-gray-500
      bg-white
      dark:bg-neutral-900
      p-4
      pr-14
      text-black
      dark:text-white
      outline-none
      focus:border-blue-500
    "
          value={prompt}
          placeholder="Ask AI about this note..."
          onChange={onPromptChange}
        />

        <button
          className="
      absolute
      bottom-4
      right-4
      flex
      items-center
      justify-center
      w-10
      h-10
      rounded-full
      bg-blue-600
      hover:bg-blue-700
      text-white
      transition
      cursor-pointer
    "
          onClick={() => askAI(prompt, content)}
        >
          <ArrowUpIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AIResponsePanel;
