import ReactMarkdown from "react-markdown";
import { ActionDropdown } from "../components/Reusable/Dropdown";
import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon, StopIcon } from "@heroicons/react/24/outline";
import { useAI } from "../hooks/useAI";
import { toast } from "sonner";
import type { ChatMessage } from "../types";
import geminiLogo from "../../src/assets/gemini.svg";
import { isAbortError } from "../components/Reusable/helper";
import { useChatForNote } from "../hooks/useChatForNote";

type AIPanelProps = {
  noteId: number;
  content: string;
  saveSelection: (action: string, signal?: AbortSignal) => void;
};

const AIResponsePanel = ({ noteId, content, saveSelection }: AIPanelProps) => {
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messages = useChatForNote(noteId);
  const controllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { generateAI, isLoading } = useAI();
  function onPromptChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(event.target.value);
  }

  function onSelectAction(action: string) {
    try {
      const controller = new AbortController();

      controllerRef.current = controller;
      if (action === "retry") setIsGenerating(true);
      saveSelection(action, controller.signal);
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("Retry failed", {
          duration: 2000,
        });
      } else if (isAbortError(error)) {
        toast.success("Stopped request", {
          duration: 2000,
        });
      } else {
        toast.error("Failed to generate content", {
          duration: 2000,
        });
      }
    } finally {
      setIsGenerating(false);
      controllerRef.current = null;
    }
  }
  async function askAI(prompt: string, content: string) {
    if (isGenerating) {
      controllerRef.current?.abort();
      controllerRef.current = null;
      setIsGenerating(false);
      return;
    }
    try {
      setIsGenerating(true);
      const controller = new AbortController();

      controllerRef.current = controller;
      await generateAI(prompt, content, false, controller.signal);
    } catch (error) {
      console.error(error);
      if (isAbortError(error)) {
        toast.success("Stopped request", {
          duration: 2000,
        });
        return;
      } else {
        toast.error("Failed to generate content", {
          duration: 2000,
        });
        return;
      }
    } finally {
      setIsGenerating(false);
      controllerRef.current = null;
    }
  }
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isGenerating]);
  return (
    <div className="w-[25dvw] border-1 border-blue-600 px-3 rounded-xl">
      <div className="flex items-start gap-2">
        <div className="border-b flex gap-2 flex-1 pb-4">
          <img src={geminiLogo} alt="Gemini Logo" width="50" height="50" />
          <h2 className="py-5 dark:!text-white">Gemini</h2>
        </div>
        <div className="ml-auto py-2">
          <ActionDropdown
            values={[
              { key: "replace", val: "Replace Note with Response", group: 1 },
              { key: "append", val: "Append Latest Response", group: 1 },
              { key: "copy", val: "Copy Latest Response", group: 1 },
              { key: "retry", val: "Regenerate Response", group: 2 },
              { key: "clear", val: "Clear Chat", group: 2 },
            ]}
            onSelect={onSelectAction}
          />
        </div>
      </div>
      <div className="w-full h-[67dvh] text-black dark:text-white border-gray-500 border-2 p-4 my-4 break-words overflow-y-auto">
        <div className="flex flex-col gap-4 overflow-y-auto">
          {messages.map((msg: ChatMessage) => (
            <div
              key={msg.id}
              className={`rounded-2xl p-3 ${
                msg.role === "user"
                  ? "max-w-[75%] ml-auto bg-blue-600 text-white"
                  : "max-w-[90%] mr-auto bg-gray-200 text-gray-900 dark:bg-neutral-800 dark:text-white"
              } `}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className="mr-auto max-w-[85%] rounded-2xl p-3 bg-neutral-800 text-white">
              <div className="flex items-center gap-2">
                <img src={geminiLogo} alt="Gemini" className="w-5 h-5" />

                <span className="text-sm text-gray-300">
                  Gemini is thinking...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
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
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (!isGenerating && prompt.trim()) {
                askAI(prompt, content);
                setPrompt("");
              }
            }
          }}
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
          onClick={() => {
            askAI(prompt, content);
            setPrompt("");
          }}
        >
          {isGenerating ? (
            <StopIcon className="w-6 h-6" />
          ) : (
            <ArrowUpIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AIResponsePanel;
