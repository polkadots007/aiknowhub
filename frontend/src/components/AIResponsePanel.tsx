import ReactMarkdown from "react-markdown";
import { ActionDropdown } from "./Reusable/Dropdown";
type AIPanelProps = {
  content: string;
  saveSelection: (action: string) => void;
};

const AIResponsePanel = ({ content, saveSelection }: AIPanelProps) => {
  return (
    <div className="w-[25dvw] border-1 border-blue-600 px-3 py-1">
      <div className="flex items-center gap-2">
        <h2 className="border-b py-5 dark:!text-white">
          AI Generated Response
        </h2>
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
      <div className="w-full h-[75dvh] text-black dark:text-white border-gray-500 border-2 p-4 my-4 break-words overflow-y-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AIResponsePanel;
