import {
  BoltIcon,
  ShareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import type { SharedUsersProp } from "../../types";

const ConfirmationModal = ({
  open,
  onConfirm,
  onCancel,
  title,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}) => {
  if (!open) return <></>;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-2/4 border border-slate-800">
        <div className="flex justify-between border-b bg-blue-600 px-2 py-2">
          <div className="w-6 h-6 text-white">
            <TrashIcon />
          </div>
          <div className="text-xl text-white font-semibold">Delete Note</div>
          <div
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => onCancel()}
          >
            <XMarkIcon />
          </div>
        </div>
        <div className="bg-white dark:bg-transparent flex items-center justify-center h-30">
          Do you want to delete{" "}
          <span className="font-semibold px-2">{title}</span>?
        </div>
        <div className="bg-white dark:bg-transparent flex justify-end gap-2 h-13 px-2">
          <button
            className="flex gap-1 items-center border border-blue-500 px-3 my-2 rounded text-sm cursor-pointer text-blue-600 dark:text-white hover:bg-blue-600 hover:text-white"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
          <button
            className="group flex gap-1 items-center bg-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-white dark:hover: border hover:text-blue-500"
            onClick={() => onConfirm()}
          >
            <TrashIcon className="w-6 h-6 text-white group-hover:text-blue-500" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ShareModal = ({
  open,
  onConfirm,
  onCancel,
  title,
  getEmails,
  sharedUsers,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  getEmails: (inputMailIds: string[]) => void;
  sharedUsers: SharedUsersProp[];
}) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");

  function addEmail(email: string) {
    const clean = email.trim().toLowerCase();
    if (!clean) return;

    if (emails.includes(clean)) return; // prevent duplicates

    setEmails((prev) => [...prev, clean]);
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail(emailInput);
      setEmailInput("");
    }

    if (e.key === "Backspace" && emailInput === "") {
      setEmails((prev) => prev.slice(0, -1));
    }
  }
  function shareNoteToEmails() {
    getEmails(emails);
    onConfirm();
    setEmailInput("");
    setEmails([]);
  }
  function handleCancel() {
    onCancel();
    setEmailInput("");
    setEmails([]);
  }
  if (!open) return <></>;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-2/5 border border-slate-800 bg-white dark:bg-inherit">
        <div className="flex justify-between border-b bg-blue-600 px-2 py-2">
          <div className="w-6 h-6 text-white">
            <ShareIcon />
          </div>
          <div className="text-xl text-white font-semibold">Share Note</div>
          <div
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => onCancel()}
          >
            <XMarkIcon />
          </div>
        </div>
        {/* Chips container */}
        <div className="flex flex-wrap gap-2 p-2 mx-4 my-6 border rounded bg-white dark:bg-gray-800 min-h-[42px]">
          {emails.map((email) => (
            <div
              key={email}
              className="flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-full text-sm"
            >
              {email}
              <button
                onClick={() =>
                  setEmails((prev) => prev.filter((e) => e !== email))
                }
                className="ml-1 text-xs hover:text-red-200"
              >
                ✕
              </button>
            </div>
          ))}
          {/* Already shared users */}
          {sharedUsers.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Shared with</p>

              <div className="flex flex-wrap gap-2">
                {sharedUsers.map((u) => (
                  <div
                    key={u.user_id}
                    className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    {u.profiles?.email}

                    <span className="text-gray-400">({u.role})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add email..."
            className="flex-1 min-w-[120px] outline-none bg-transparent text-sm dark:text-white"
          />
        </div>
        <div className="bg-white dark:bg-transparent flex justify-end gap-2 h-13 px-2">
          <button
            className="flex gap-1 items-center border border-blue-500 px-3 my-2 rounded text-sm cursor-pointer text-blue-600 dark:text-white hover:bg-blue-600 hover:text-white"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
          <button
            className="group flex gap-1 items-center bg-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-white dark:hover: border border-blue-200 hover:text-white-500 transition-colors duration-200 ease-in-out active:scale-[0.98]"
            onClick={() => shareNoteToEmails()}
          >
            <ShareIcon className="w-6 h-6 text-white group-hover:text-blue-500" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

const AIModal = ({
  open,
  onConfirm,
  onClose,
}: {
  open: boolean;
  onConfirm: (action: string) => void;
  onClose: () => void;
}) => {
  const [lastPromptAction, setLastPromptAction] = useState<string>("");
  const actions: string[] = [
    "Summarize",
    "Improve",
    "Explain",
    "Generate Title",
  ];
  function chooseAction(action: string) {
    setLastPromptAction(action);
  }
  function handleApply(action: string) {
    onClose();
    onConfirm(action);
  }
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="w-2/4 bg-white dark:bg-black border border-slate-800 rounded-lg shadow-xl">
          <div className="flex justify-between border-b bg-blue-600 px-2 py-2">
            <div className="w-6 h-6 text-white">
              <BoltIcon />
            </div>
            <div className="text-xl text-white font-semibold">
              What should AI do?
            </div>
            <div
              className="w-6 h-6 text-white cursor-pointer"
              onClick={() => onClose()}
            >
              <XMarkIcon />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 my-4 h-30 place-items-center">
            {actions.map((action: string) => (
              <button
                key={action}
                className={` ${lastPromptAction === action ? "bg-blue-600 border-white text-white" : ""} flex gap-1 py-3 w-[10rem] justify-center items-center border border-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-blue-600 dark:text-white hover:bg-blue-600 hover:text-white`}
                onClick={() => chooseAction(action)}
              >
                {action}
              </button>
            ))}
          </div>
          <div className="flex justify-end gap-2 h-13 px-2 mt-16">
            <button
              className="flex gap-1 items-center border border-blue-500 px-3 my-2 rounded text-sm cursor-pointer text-blue-600 dark:text-white  hover:bg-blue-600 hover:text-white"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              className="group flex gap-1 items-center bg-blue-600 px-3 my-2 rounded text-sm cursor-pointer text-white hover:bg-white dark:hover: border hover:text-blue-500"
              disabled={!lastPromptAction}
              onClick={() => handleApply(lastPromptAction)}
            >
              Apply AI
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export { ConfirmationModal, ShareModal, AIModal };
